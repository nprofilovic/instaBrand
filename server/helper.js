import * as firebase from 'firebase';

class Helper {
    static setProductName(productId, name){
        let productNamePath = "/product/"+productId+"details/name"
        return firebase.database().ref(productNamePath).set(name)
    }

    static setProductName(productId, link){
        let productNamePath = "/product/"+productId+"details/link"
        return firebase.database().ref(productNamePath).set(link)
    }

    static setProductName(productId, color){
        let productNamePath = "/product/"+productId+"details/color"
        return firebase.database().ref(productNamePath).set(color)
    }

    static setProductName(productId, type){
        let productNamePath = "/product/"+productId+"details/type"
        return firebase.database().ref(productNamePath).set(type)
    }

    static setProductName(productId, face){
        let productNamePath = "/product/"+productId+"details/face"
        return firebase.database().ref(productNamePath).set(face)
    }

    static setProductName(productId, pallete){
        let productNamePath = "/product/"+productId+"details/pallete"
        return firebase.database().ref(productNamePath).set(pallete)
    }

    static setProductName(productId, about){
        let productNamePath = "/product/"+productId+"details/about"
        return firebase.database().ref(productNamePath).set(about)
    }

    static setImageUrl(productId, url){
        let productNamePath = "/product/"+productId+"details/url"
        return firebase.database().ref(productNamePath).set(url)
    }
}

module.exports = Helper