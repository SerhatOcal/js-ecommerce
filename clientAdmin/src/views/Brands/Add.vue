<script setup>
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import BrandService from '../../services/BrandService';

const toast = useToast();
const brandService = new BrandService();

const data = reactive({
    home: {
        icon: 'pi pi-arrow-left', 
        to: '/brands',
        label: ' Markalar'
    },
    submitted: false,
    status:false,
    loading: false,
    brand: {},
});

const save = () => {
    data.submitted = true;
    if(data.brand.name){
        data.loading = true;
        let formData = new FormData();
        formData.append("name", data.brand.name);
        formData.append("sort", (!data.brand.sort ? 999 : data.brand.sort));
        formData.append("status", data.brand.status);
        formData.append("image", data.brand.image);

        brandService.saveBrand(formData)
        .then((response) => {
            if(response.success){
                toast.add({severity:'success', summary: 'Başarılı', detail: response.message, life: 10000});
            } else if(response.error) {
                toast.add({severity:'error', summary: 'Hata', detail: response.error.message, life: 10000});
            } else {
                toast.add({severity:'error', summary: 'Hata', detail: response.errors[0].message, life: 10000});
            }
        }).finally(() => {
            data.loading = false;
        });
    }
};

const onUpload = (event) => {
    data.brand.image = event.files[0];
}
</script>
<template>
    <Breadcrumb :home="data.home" class="mb-3"></Breadcrumb>
    <div class="grid p-fluid">
    <Toast/>
        <div class="col-6 col-offset-1 md:col-6">
            <div class="card">
                <h5>Marka Ekle</h5>
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <div class="field">
                            <label for="markaAdi">Marka Adı <small class="p-error">*</small></label>
                            <InputText v-model.trim="data.brand.name" required="true" autofocus :class="{'p-invalid': data.submitted && !data.brand.name}"></InputText>
                            <small class="p-error" v-if="data.submitted && !data.brand.name">Marka Adı boş bırakılamaz.</small>
                        </div>
                    </div>
                    <div class="col-3 mb-2 lg:col-3 lg:mb-0">
                        <div class="field">
                            <label for="siraNo">Sıra No </label>
                            <InputNumber 
                                :min="0"
                                :useGrouping="false"
                                mode="decimal" 
                                v-model.number="data.brand.sort" 
                                placeholder="999" 
                                showButtons 
                                buttonLayout="horizontal" 
                                incrementButtonIcon="pi pi-plus" 
                                decrementButtonIcon="pi pi-minus">
                            </InputNumber>
                        </div>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0 clear-fix">
                        <div class="field">
                            <label for="status">Durumu</label>
                        </div>
                        <InputSwitch v-model="data.brand.status" class="mb-3"></InputSwitch>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0 clear-fix">
                        <div class="field">
                            <label for="status">Resim Yükle</label>
                            <FileUpload 
                                :auto="true" 
                                :customUpload=true
                                :showUploadButton=false
                                :showCancelButton=false
                                chooseLabel="Dosya Seç" 
                                @uploader="onUpload">
                            </FileUpload>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 md:col-3">
            <div class="card">
                <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                    <div class="field">
                        <h5>Seo Bilgileri</h5>
                        <label for="parent_id">Başlık (Title)</label>
                        <Textarea v-model="value" rows="4" cols="30" />
                    </div>
                </div>
                <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                    <div class="field">
                        <label for="parent_id">Açıklama (Description)</label>
                        <Textarea v-model="value" rows="3" cols="30" />
                    </div>
                </div>
                <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                    <div class="field">
                        <label for="parent_id">Anahtar Kelime (Keyword)</label>
                        <Textarea v-model="value" rows="3" cols="30" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 mb-2 lg:col-6 lg:mb-0 clear-fix">
            <div class="formgroup-inline justify-content-end">
                <div class="field m-0 mr-2">
                    <router-link to="/categories">
                        <Button label="Vazgeç" icon="pi pi-times" class="p-button p-button-secondary mr-2 mb-2"/>
                    </router-link>
                </div>
                <div class="field m-0 mr-2">
                    <Button label="Kaydet" icon="pi pi-check" class="p-button p-button-success mr-2 mb-2" :loading="data.loading" @click="save()"/>
                </div>
            </div>
        </div>
    </div>
</template>