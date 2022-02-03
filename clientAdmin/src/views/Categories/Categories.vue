<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
                            <router-link to="/categories/add">
                                <Button label="Kategori Ekle" icon="pi pi-plus" class="p-button-success mr-2"/>
                            </router-link>
							<Button label="Sil" icon="pi pi-trash" class="p-button-danger mr-2" @click="confirmDeleteSelectedAll()" :disabled="!data.selectedCategories" />
                            <Button label="Kategori Ağacı" icon="pi pi-sitemap" class="p-button-warning mr-2"/>
                        </div>
					</template>
				</Toolbar>

				<DataTable
                    class="p-datatable-customers"
                    dataKey="id"
                    currentPageReportTemplate=" Kayıt Sayısı {totalRecords} " 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                    v-model:selection="data.selectedCategories" 
                    :value="data.categories" 
                    :paginator="true" 
                    :rows="10" 
                    :filters="data.filters"
                    :rowsPerPageOptions="[5,10,25,50,100,200]"
                    responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Kategoriler</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="data.filters['name'].value" placeholder="Kategori adına göre Ara..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="id" header="ID" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">ID</span>
							{{slotProps.data.id}}
						</template>
					</Column>
                    <Column field="name" header="MARKA ADI" :sortable="true">
						<template #body="slotProps">
							{{slotProps.data.name}}
						</template>
					</Column>
                    <Column field="sort" header="SIRA NO" :sortable="true">
                        <template #body="slotProps">
							{{slotProps.data.sort}}
						</template>
                    </Column>
					<Column field="status" header="DURUMU" :sortable="true">
						<template #body="slotProps">
                            <span :class="slotProps.data.status ? 'p-button p-button-outlined p-button-success' : 'p-button p-button-outlined p-button-danger'">{{slotProps.data.status ? 'Aktif' : 'Pasif'}}</span>
						</template>
					</Column>
                    <Column field="updatedAt" header="GÜNCELLENME">
						<template #body="slotProps">
                            {{this.moment(slotProps.data.updatedAt).format('L LT')}}
						</template>
					</Column>
					<Column field="transactions" header="İŞLEMLER">
						<template #body="slotProps">
                            <router-link :to="{ name: 'edit-category', params: { id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" class="p-button-outlined p-button-success mr-2"/>
                            </router-link>
							<Button icon="pi pi-trash" class="p-button-outlined p-button-danger" @click="confirmDeleteCategory(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="data.deleteDialog" :style="{width: '450px'}" header="Bildirim" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="data.category"><b>{{data.category.name}}</b> Kategorisini silmek istediğinizden emin misiniz?</span>
					</div>
					<template #footer>
						<Button label="Vazgeç" icon="pi pi-times" class="p-button-text" @click="data.deleteDialog = false"/>
						<Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteCategory()" />
					</template>
				</Dialog>

				<Dialog v-model:visible="data.deleteDialogAll" :style="{width: '450px'}" header="Bildirim" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="data.category">Seçilen kategorileri silmek istediğinizden emin misiniz?</span>
					</div>
					<template #footer>
						<Button label="Vazgeç" icon="pi pi-times" class="p-button-text" @click="data.deleteDialogAll = false, data.selectedCategories=null"/>
						<Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteCategories()" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import CategoryService from '../../services/CategoryService';

const categoryService = new CategoryService();
const toast = useToast();

const data = reactive({
    categories: null,
    category: {},
    filters: {},
    selectedCategories: null,
    submitted: false,
    deleteDialog: false,
    deleteDialogAll: false,
});

onMounted(() => {
    categoryService.getCategories().then(response => data.categories = response);
});

const confirmDeleteCategory = (category) => {
    data.category = category;
	data.deleteDialog = true;
};

const deleteCategory = () => {
    categoryService.deleteCategory(data.category.id).then((response) => {
        if(response.success){
            toast.add({severity:'success', summary: 'Başarılı', detail: response.message, life: 10000});
        } else if(response.error) {
            toast.add({severity:'error', summary: 'Hata', detail: response.error.message, life: 10000});
        } else {
            toast.add({severity:'error', summary: 'Hata', detail: response.errors[0].message, life: 10000});
        }
    }).finally(() => {
        data.deleteDialog = false;
        categoryService.getCategories().then(response => data.categories = response);
    });
};

const confirmDeleteSelectedAll = () => {
    data.deleteDialogAll = true;
};

const deleteCategories = () => {
    let count = 0;
    data.selectedCategories.forEach((category) => {
        count++;
        categoryService.deleteCategory(category.id).then((response) => {
            if(response.error) {
                toast.add({severity:'error', summary: 'Hata', detail: response.error.message, life: 10000});
            }
            if(response.errors){
                toast.add({severity:'error', summary: 'Hata', detail: response.errors[0].message, life: 10000});
            }
        }).finally(() => {
            data.deleteDialogAll = false;
            data.selectedCategories = null;
            categoryService.getCategories().then(response => data.categories = response);
        });
    });
    toast.add({severity:'success', summary: 'Başarılı', detail: `${count} Kayıt Silindi`, life: 10000});
    count = 0;
};

const initFilters = () => {
    data.filters = {
        'name': {value: data.category.name, matchMode: FilterMatchMode.STARTS_WITH},
    }
}
initFilters();

</script>