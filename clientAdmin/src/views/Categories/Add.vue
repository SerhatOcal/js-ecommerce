<template>
    <Breadcrumb :home="data.home" class="mb-3"></Breadcrumb>
    <div class="grid p-fluid">
    <Toast/>
        <div class="col-12 col-offset-1 md:col-6">
            <div class="card">
                <h5>Kategori Ekle</h5>
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <div class="field">
                            <label for="name">Kategori Adı <small class="p-error">*</small></label>
                            <InputText v-model.trim="data.category.name" required="true" autofocus :class="{'p-invalid': data.submitted && !data.category.name}"></InputText>
                            <small class="p-error" v-if="data.submitted && !data.category.name">Kategori Adı boş bırakılamaz.</small>
                        </div>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <div class="field">
                            <label for="parent_id">Bağlı Olduğu Kategori</label>
                            <MultiSelect :selectionLimit=1 v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="Ana Kategori" />
                        </div>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <div class="field">
                            <label for="parent_id">Üst içerik Bilgileri</label>
                            <Editor v-model="data.category.top_description" editorStyle="height: 150px"/>
                        </div>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <div class="field">
                            <label for="parent_id">Alt İçerik Bilgileri</label>
                            <Editor v-model="data.category.sub_description" editorStyle="height: 160px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 md:col-3">
            <div class="card">
                <div class="grid formgrid">
                    <div class="col mb-2 lg:col-6 lg:mb-0">
                        <div class="field">
                            <label for="sort">Sıra No </label>
                            <InputNumber 
                                :min="0"
                                :useGrouping="false"
                                mode="decimal" 
                                v-model.number="data.category.sort" 
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
                        <InputSwitch v-model="data.category.status" class="mb-3"></InputSwitch>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                    <div class="field">
                        <h5>Seo Bilgileri</h5>
                        <label for="parent_id">Başlık (Title)</label>
                        <Textarea v-model="data.category.meta_title" rows="4" cols="30" />
                    </div>
                </div>
                <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                    <div class="field">
                        <label for="parent_id">Açıklama (Description)</label>
                        <Textarea v-model="data.category.meta_description" rows="4" cols="30" />
                    </div>
                </div>
                <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                    <div class="field">
                        <label for="parent_id">Anahtar Kelime (Keyword)</label>
                        <Textarea v-model="data.category.meta_keywords" rows="4" cols="30" />
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

<script setup>
import { reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CategoryService from '../../services/CategoryService';

const toast = useToast();
const selectedCategory = ref();
let categories = ref([]);
const categoryService = new CategoryService();
categoryService.getCategories().then(response => categories.value = response);

const data = reactive({
    home: {
        icon: 'pi pi-arrow-left', 
        to: '/categories',
        label: ' Kategoriler'
    },
    submitted: false,
    status:false,
    loading: false,
    category: {},
});

const save = () => {
    data.submitted = true;
    if(data.category.name){
        data.loading = true;
        let formData = new FormData();
        formData.append("name", data.category.name);
        formData.append("parent_id", selectedCategory.value ? selectedCategory.value[0].id : 0);
        formData.append("sort", (!data.category.sort ? 999 : data.category.sort));
        formData.append("status", data.category.status);
        formData.append("top_description", (!data.category.top_description ? "" : data.category.top_description.replace(/(<([^>]+)>)/ig, '')));
        formData.append("sub_description", (!data.category.sub_description ? "" : data.category.sub_description.replace(/(<([^>]+)>)/ig, '')));
        formData.append("meta_title", (!data.category.meta_title ? "" : data.category.meta_title.replace(/(<([^>]+)>)/ig, '')));
        formData.append("meta_description", (!data.category.meta_description ? "" : data.category.meta_description.replace(/(<([^>]+)>)/ig, '')));
        formData.append("meta_keywords", (!data.category.meta_keywords ? "" : data.category.meta_keywords).replace(/(<([^>]+)>)/ig, ''));

        categoryService.saveCategory(formData)
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
</script>