<template>
    <Toast/>
    <Breadcrumb :home="home" class="mb-3"></Breadcrumb>
    <div class="grid p-fluid">
		<div class="col-6 col-offset-3">
                <div class="card">
                    <h5>Marka Ekle</h5>
                    <div class="grid formgrid">
                        <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                            <div class="field">
                                <label for="markaAdi">Marka Adı <small class="p-error">*</small></label>
                                <InputText v-model.trim="brand.name" required="true" autofocus :class="{'p-invalid': submitted && !brand.name}"></InputText>
                                <small class="p-error" v-if="submitted && !brand.name">Marka Adı boş bırakılamaz.</small>
                            </div>
                        </div>
                        <div class="col-3 mb-2 lg:col-3 lg:mb-0">
                            <div class="field">
                                <label for="siraNo">Sıra No </label>
                                <InputNumber 
                                    :min="0"
                                    :useGrouping="false"
                                    mode="decimal" 
                                    v-model.number="brand.sort" 
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
                            <InputSwitch v-model="brand.status" class="mb-3"></InputSwitch>
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
                        <div class="col-12 mb-2 lg:col-12 lg:mb-0 clear-fix">
                            <div class="formgroup-inline justify-content-end">
                                <div class="field m-0 mr-2">
                                    <router-link to="/brands">
                                        <Button label="Vazgeç" icon="pi pi-times" class="p-button-outlined p-button-help mr-2 mb-2"/>
                                    </router-link>
                                </div>
                                <div class="field m-0 mr-2">
                                    <Button label="Kaydet" icon="pi pi-check" class="p-button-outlined p-button-success mr-2 mb-2" :loading="loading" @click="save"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
	</div>
</template>

<script>
import BrandService from '../../services/BrandService';

export default {
    data() {
        return {
            home: {
                icon: 'pi pi-arrow-left', 
                to: '/brands',
                label: ' Markalar'
            },
            submitted: false,
            status:false,
            loading: false,
            brand: {},
            brandService: new BrandService(),
        }
    },
    methods: {
        save() {
            this.submitted = true;
            if(this.brand.name){
                this.loading = true;
                let formData = new FormData();
                formData.append("name", this.brand.name);
                formData.append("sort", (!this.brand.sort ? 999 : this.brand.sort));
                formData.append("status", this.brand.status);
                formData.append("image", this.brand.image);

                this.brandService.saveBrands(formData)
                    .then((response) => {
                        console.log(response);
                        if(response.success){
                            this.$toast.add({severity:'success', summary: 'Başarılı', detail: response.message, life: 10000});
                        } else if(response.error) {
                            this.$toast.add({severity:'error', summary: 'Hata', detail: response.error.message, life: 10000});
                        } else {
                            this.$toast.add({severity:'error', summary: 'Hata', detail: response.errors[0].message, life: 10000});
                        }
                    }).finally(() => {
                        this.loading = false;
                    });
            }
           
        },

        onUpload(event){
            this.brand.image = event.files[0];
        }
    }
}
</script>