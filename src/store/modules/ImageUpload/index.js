import firebase from 'firebase'

export default {
    state: {
        result: [],
    },
    getters: {
    },
    mutations: {
        setResult(state, result) {
            state.result.push(result);
        },
    },
    actions: {
        cancel(context, index) {
            return context.state.result[index].cancel();
        },
        async uploadImage(context, payload) {
            const image = await context.dispatch('getSnapshot', payload)
                .then(async snapshot => {
                    try {
                        const url = await snapshot.ref.getDownloadURL();
                        return url;
                    } catch (e) {
                        console.warn('Failed to read data urlW');
                        return null;
                    }
                    console.log('Uploaded a blob or file!');
                })
                .catch(err => {
                    console.warn(err);
                    return null;
                });
            return image;
        },
        getSnapshot(context, {file, name, uuid}) {
            try {
                const storageRef = firebase.storage().ref(uuid);
                const result = storageRef.child(name).put(file);
                /**
                 * Save request for cancel possibility
                 */
                context.commit('setResult', result);
                return result;
            } catch (e) {
                console.warn(e);
                console.log('Failed to upload image')
            }
        },
        deleteImage(context, {name, uuid}) {
            try {
                const storageRef = firebase.storage().ref(uuid);
                const desertRef = storageRef.child(name);

                desertRef.delete()
                    .then(() => {
                        console.log('Delete successfully');
                    })
                    .catch((error) => {
                        console.warn('Cant delete the image');
                        console.warn(error);
                    });
            } catch (e) {
                console.warn(e);
                console.log("Failed to delete image");
            }

        }
    }
}
