const {db} = require('../../firebase_config.js');
const uuid = require('uuid');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');
const apiSuccessfulResponses = require('../../apiResponses/apiSuccessfulResponses.js');
const filesService = require('../../service/filesService.js');
const createUserDto = require('./dto/createUserDto.js');

class UsersRepository {
    async create(username, email, files, id, isAdmin) {
        if(username && email && id && isAdmin !== undefined && isAdmin !== null) {
            if(files) {
                const filename = id + '.jpg';
                const user = createUserDto(id, username, email, filename, isAdmin);
                filesService.uploadUserImage(files.img, filename);
                const response = await db.collection('users').doc(id).create(user);
                return apiSuccessfulResponses.successfullResponse(response);
            } else {
                const user = createUserDto(id, username, email, null, isAdmin);
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
            if (!id) {
                return apiExceptionResponses.badRequest('We could not get users id');
            }
            if (isAdmin === undefined || isAdmin === null) {
                return apiExceptionResponses.badRequest('We could not get users role');
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

    async update(updatedFields, id) {
        if(id) {
            if(updatedFields) {
                const ref = db.collection('users').doc(id);
                const user = (await ref.get()).data();
                if(user) {
                    const response = await ref.update(updatedFields);
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

    async searchAndFilterAndSortUser(query, lastUsername, level, isAdmin, isAccountVerified, orderBy) {
        const users = [];
        let indexOfLastReturnedUser = null;
        let ref = null;
        let matchingToSearchUsers = null;
        if(orderBy) {
            ref = db.collection('users').orderBy('username', orderBy);
        } else {
            ref = db.collection('users').orderBy('username', 'desc');
        }
        if(ref) {
            const response = await ref.get();
            response.docs.forEach((doc) => {
                users.push(doc.data());
            });
            const eligibleUsers = this._filterUsers(level, isAdmin, isAccountVerified, users);
            if(lastUsername) {
                indexOfLastReturnedUser = eligibleUsers.findIndex(user => user.username === lastUsername);
            }
            if(query) {
                matchingToSearchUsers = eligibleUsers.filter(user => {
                        if(user.username.toLowerCase().includes(query.toLowerCase())) {
                            return user;
                        }
                        if(user.email) {
                            const index = user.email.split('').indexOf('@');
                            const email = user.email.substring(0, index);
                            if(email.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            }
                        }
                        if(user.phone) {
                            if(user.phone.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            }
                        }
                    });
            } else {
                matchingToSearchUsers = eligibleUsers;
            }
            const totalCount = matchingToSearchUsers.length;
            const pageCount = Math.ceil(totalCount / 10);
            const usersToReturn = matchingToSearchUsers.slice(indexOfLastReturnedUser !== null ? indexOfLastReturnedUser + 1 : 0, 10);
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: usersToReturn.length, users: usersToReturn});
        } else {
            return apiExceptionResponses.internalServerError();
        }
    }

    _filterUsers(level, isAdmin, isAccountVerified, users) {
        const unsuitableUsers = users.filter((user) => {
            if(level) {
                if(user.level.level !== level) {
                    return user;
                }
            }
            if(isAdmin) {
                const isAdminBool = isAdmin === 'true' ? true : false;
                if(user.isAdmin !== isAdminBool) {
                    return user;
                }
            }
            if(isAccountVerified) {
                const isAccountVerifiedBool = isAccountVerified === 'true' ? true : false;
                if(user.isAccountVerified !== isAccountVerifiedBool) {
                    return user;
                }
            }
        });
        const eligibleUsers = users.filter(user => {
            if(!unsuitableUsers.includes(user)) {
                return user;
            }
        });
        return eligibleUsers;
    }
}

module.exports = new UsersRepository();

