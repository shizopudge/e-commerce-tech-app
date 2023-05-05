const {db} = require('../../firebase_config.js');
const uuid = require('uuid');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');
const apiSuccessfulResponses = require('../../apiResponses/apiSuccessfulResponses.js');
const filesService = require('../../service/filesService.js');
const createUserDto = require('./dto/createUserDto.js');

class UsersRepository {
    async create(username, email, files) {
        const id = uuid.v4();
        if(username && email) {
            if(files) {
                const filename = id + '.jpg';
                const user = createUserDto(id, username, email, filename);
                filesService.uploadUserImage(files.img, filename);
                const response = await db.collection('users').doc(id).create(user);
                return apiSuccessfulResponses.successfullResponse(response);
            } else {
                const user = createUserDto(id, username, email);
                const response = await db.collection('users').doc(id).create(user);
                return apiSuccessfulResponses.successfullResponse(response);
            } 
        } else {
            if (!username) {
                return apiExceptionResponses.badRequest('We could not get username');
            }
            if (!email) {
                return apiExceptionResponses.badRequest('We could not get users email');
            }
        }
    }

    async delete(id) {
        if(id) {
            const ref = db.collection('users').doc(id);
            const user = (await ref.get()).data();
            if(user) {
                const fileName = id + '.jpg';
                const response = await ref.delete();
                filesService.deleteUserImage(fileName);
                return apiSuccessfulResponses.successfullResponse(response);
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    async getOne(id) {
        if(id) {
            const ref = db.collection('users').doc(id);
            const response = await ref.get();
            if(response.data()) {
                return apiSuccessfulResponses.successfullResponse(null, response.data());
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    async getAll(lastUsername) {
        const users = [];
        const countRef = db.collection('users').count();
        const totalCount = (await countRef.get()).data().count;
        const pageCount = Math.ceil(totalCount / 10);
        if(lastUsername) {
            const ref = db.collection('users').limit(10).orderBy('username').startAfter(lastUsername);
            const response = await ref.get();
            response.docs.forEach((doc) => {
                users.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: users.length, users,});
        } else {
            const ref = db.collection('users').limit(10).orderBy('username');
            const response = await ref.get();
            response.docs.forEach((doc) => {
                users.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: users.length, users,});
        }
    }

    async deleteImage(id) {
        if(id) {
            const ref = db.collection('users').doc(id);
            const user = (await ref.get()).data();
            if(user) {
                const response = await ref.update({image: null});
                if(user.image) {
                    filesService.deleteUserImage(user.image);
                    return apiSuccessfulResponses.successfullResponse(response);
                } else {
                    return apiExceptionResponses.badRequest('User has no image');
                }
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    async uploadImage(id, files) {
        if(files) {
        const image = files.image;
        const ref = db.collection('users').doc(id);
        const user = (await ref.get()).data();
            if(user) {
                if(image) {
                    const filename = id + '.jpg';
                    const response = await ref.update({image: filename});
                    filesService.uploadUserImage(image, filename);
                    return apiSuccessfulResponses.successfullResponse(response);
                } else {
                    return apiExceptionResponses.badRequest('We could not get your image');
                }
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get your image');
        }
    }

    async update(updatedUser, id) {
        if(id) {
            if(updatedUser) {
                const ref = db.collection('users').doc(id);
                const user = (await ref.get()).data();
                if(user) {
                    const response = await ref.update(updatedUser);
                    return apiSuccessfulResponses.successfullResponse(response);
                } else {
                    return apiExceptionResponses.notFound();
                }
            } else {
                return apiExceptionResponses.badRequest('We could not get updated user');
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    //mb add search by email
    async searchUser(query, lastUsername) {
        const users = [];
        const countRef = db.collection('users').
        where('username', '>=', query ? query : 0).
        where('username', '<', query ? query.substring(0, query.length - 1) + String.fromCharCode(query.charCodeAt(query.length - 1) + 1) : 0).orderBy('username').count();
        const totalCount = (await countRef.get()).data().count;
        const pageCount = Math.ceil(totalCount / 10);
        if(lastUsername) {
            const ref = db.collection('users').
            where('username', '>=', query ? query : 0).
            where('username', '<', query ? query.substring(0, query.length - 1) + String.fromCharCode(query.charCodeAt(query.length - 1) + 1) : 0).limit(10).orderBy('username').startAfter(lastUsername);
            const response = await ref.get();
            response.docs.forEach((doc) => {
                users.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: users.length, users});
        } else {
            const ref = db.collection('users').
            where('username', '>=', query ? query : 0).
            where('username', '<', query ? query.substring(0, query.length - 1) + String.fromCharCode(query.charCodeAt(query.length - 1) + 1) : 0).limit(10).orderBy('username');
            const response = await ref.get();
            response.docs.forEach((doc) => {
                users.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: users.length, users});
        }
    }
}

module.exports = new UsersRepository();

