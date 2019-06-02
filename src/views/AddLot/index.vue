<template>
    <div class="add-lot">
        <h2>Add your lot here</h2>
        <form @submit.prevent class="photo" @input="">
            <p>Upload lot`s photos</p>
            <image-upload
                    @upload-image="uploadImage"
                    :disabled="isFullImageList"
                    :max="imageListMaxSize"
            >
            </image-upload>

            <image-preview
                    @remove-image="removeImage"
                    :imagesPreviewList="imagesPreviewList"
                    reference="imagePreview"
            >
            </image-preview>

            <base-input
                    v-model="lot.title"
                    reference="lotName"
                    :validation="{required: true}"
            >
                Lot name:
            </base-input>

            <base-input
                    type="number"
                    v-model="lot.price"
                    reference="lotPrice"
                    :validation="numbersValidation"
            >
                Start price:
            </base-input>

            <base-input
                    type="number"
                    v-model="lot.minStep"
                    reference="lotRateStep"
                    :validation="numbersValidation"
            >
                Minimal rate step
            </base-input>
            <base-input
                    type="date"
                    v-model="lot.finishDate"
                    reference="lotFinishDate"
                    :validation="{required: true}"
                    :min="minDate"
                    :max="maxDate"
            >
                Finish date:
            </base-input>
            <base-input
                    type="number"
                    v-model="lot.lotsNumber"
                    reference="lotsNumber"
                    :validation="numbersValidation"
            >
                Lots number:
            </base-input>

            <base-multilist
                    class="base-multiselect"
                    :list="deliveryServicesList"
                    @select-items="selectPosts"
                    reference="basemultiselect"
                    :validation="{required: true}"
            >
            </base-multilist>

            <base-textarea v-model="lot.description" reference="lotDescription">
                Detail lot description
            </base-textarea>

            <!--author contacts ?? auto substitution-->
            <base-input v-model="lot.author.name" reference="lotsAuthorName">
                Author name:
            </base-input>
            <base-input
                    v-model="lot.author.contacts.phoneNumber"
                    reference="lotsAuthorPhone"
                    :validation="phoneNumber"
            >
                Author telephone:
            </base-input>
            <base-input
                    v-model="lot.author.contacts.email"
                    reference="lotsAuthorEmail"
                    :validation="{required: true, email: true}"
            >
                Author email:
            </base-input>

            <div class="public-lot">
                <base-button @click="publicLot">
                    Public lot
                </base-button>
            </div>
        </form>
    </div>
</template>

<script src="./addLot.js"></script>

<style scoped lang="scss">
    .add-lot {
        width: calc(100% - 2rem);
        padding: 1rem;
    }

    .photo {
        width: 100%;
    }

    .base-multiselect {
        max-width: 570px;
        margin: 0 auto;
        margin-top: 1rem;
    }

</style>
