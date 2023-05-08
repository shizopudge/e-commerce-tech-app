const fs = require('fs');
const path = require("path");

class FilesService {
    uploadUserImage(img, fileName) {
        try {
            const filePath = path.resolve('static', 'users');
            this._createDirectory(filePath);
            fs.writeFileSync(path.join(filePath, fileName), img.data);
        } catch (error) {
            console.log(error);
        }  
    }

    uploadProductImages(images) {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', 'products');
            this._createDirectory(filePath);
            images.forEach(img => {
                const fileName = img.fileName;
                const image = img.img;
                fs.writeFileSync(path.join(filePath, fileName), image.data);
            });
        } catch (error) {
            console.log(error);
        }  
    }

    uploadProductImage(image, fileName) {
        try {
            const filePath = path.resolve(__dirname, '..','static', 'products');
            this._createDirectory(filePath);
            fs.writeFileSync(path.join(filePath, fileName), image.data);
        } catch (error) {
            console.log(error);
        }  
    }

    uploadReviewImages(images) {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', 'reviews');
            this._createDirectory(filePath);
            images.forEach(img => {
                const fileName = img.fileName;
                const image = img.img;
                fs.writeFileSync(path.join(filePath, fileName), image.data);
            });
        } catch (error) {
            console.log(error);
        }  
    }

    uploadReviewImage(image, fileName) {
        try {
            const filePath = path.resolve(__dirname, '..','static', 'reviews');
            this._createDirectory(filePath);
            fs.writeFileSync(path.join(filePath, fileName), image.data);
        } catch (error) {
            console.log(error);
        }  
    }

    deleteProductImages(filesNames) {
        try {
            filesNames.forEach(fileName => {
                const filePath = path.resolve(__dirname, '..','static', 'products', fileName);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });       
        } catch (error) {
            console.log(error);
        }  
    }

    deleteProductImage(filesName) {
        try {
            const filePath = path.resolve(__dirname, '..','static', 'products', filesName);
            if(fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }         
        } catch (error) {
            console.log(error);
        }  
    }

    deleteReviewImages(filesNames) {
        try {
            filesNames.forEach(fileName => {
                const filePath = path.resolve(__dirname, '..','static', 'reviews', fileName);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });       
        } catch (error) {
            console.log(error);
        }  
    }

    deleteReviewImage(filesName) {
        try {
            const filePath = path.resolve(__dirname, '..','static', 'reviews', filesName);
            if(fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }         
        } catch (error) {
            console.log(error);
        }  
    }

    deleteUserImage(fileName) {
        try {
            const filePath = path.resolve(__dirname, '..','static', 'users', fileName);
            if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.log(error);
        }  
    }

    _createDirectory(filePath) {
        const staticPath = path.resolve(__dirname, '..', 'static');
        if(!fs.existsSync(staticPath)) {
            fs.mkdirSync(staticPath);
        }
        if(!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
    }
}

module.exports = new FilesService();