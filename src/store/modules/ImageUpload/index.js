import firebase from 'firebase'

export default {
    state: {
        result: [],
    },
    mutations: {
        setResult(state, result) {
            state.result.push(result);
        },
        // cancel(state) {
        //     console.log(state.result.cancel())
        // },
    },
    actions: {
        cancel(context, index) {
            return context.state.result[index].cancel();
        },
        async uploadImage(context, {file, name, uuid}) {

            try {
                const storageRef = firebase.storage().ref(uuid);
                const result = storageRef.child(name).put(file);
                context.commit('setResult', result);
                return result;
            } catch (e) {
                console.warn(e);
                console.log('Failed to upload image')
            }

            /*result.cancel();

            const url = result
                .then(async snapshot => {
                    try {
                        const url = await snapshot.ref.getDownloadURL();
                        console.log("File available at", url);
                        return url;
                    } catch (e) {
                        console.warn('Failed to read data urlW')
                    }
                    console.log('Uploaded a blob or file!');
                })
                .catch(err => {
                    console.warn(err);
                });

            return url;*/
        },
        deleteImage(context, {name, uuid}) {
            try {
                const storageRef = firebase.storage().ref(uuid);
                const desertRef = storageRef.child(name);
                // Delete the file
                desertRef.delete()
                    .then(function () {
                        // File deleted successfully
                        console.log('Delete successfully');
                    })
                    .catch(function (error) {
                        console.warn('Cant delete the image');
                        console.warn(error);
                        // Uh-oh, an error occurred!
                    });
            } catch (e) {
                console.warn(e);
                console.log("Failed to delete image");
            }

        }
    }
}
