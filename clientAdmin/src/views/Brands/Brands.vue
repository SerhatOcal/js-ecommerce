<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
                            <router-link to="/brands/add">
							<Button label="Marka Ekle" icon="pi pi-plus" class="p-button-success mr-2"/>
                            </router-link>
							<Button label="Sil" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelectedAll" :disabled="!selectedBrands || !selectedBrands.length" />
						</div>
					</template>
				</Toolbar>

				<DataTable
                    dataKey="id"
                    currentPageReportTemplate=" Kayıt Sayısı {totalRecords} " 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                    v-model:selection="selectedBrands" 
                    :value="brands" 
                    :paginator="true" 
                    :rows="10" 
                    :filters="filters"
                    :rowsPerPageOptions="[5,10,25,50,100,200]"
                    responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Markalar</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['name'].value" placeholder="Ara..." />
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
					<Column header="Image">
						<template #body="slotProps">
							<img v-if="slotProps.data.image_name" :src="'http://localhost:3000/uploads/images/brands/' + slotProps.data.image_name" :alt="slotProps.data.image_name" class="shadow-2" width="100" />
                            <i v-else class="pi pi-image" style="font-size:2rem"></i>
                        </template>
					</Column>
                    <Column field="markaAdi" header="MARKA ADI" :sortable="true">
						<template #body="slotProps">
							{{slotProps.data.name}}
						</template>
					</Column>
                    <Column field="siraNo" header="SIRA NO" :sortable="true">
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
					<Column field="islemler" header="İŞLEMLER">
						<template #body="slotProps">
                            <router-link :to="{ name: 'edit-brand', params: { id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" class="p-button-outlined p-button-success mr-2"/>
                            </router-link>
							<Button icon="pi pi-trash" class="p-button-outlined p-button-danger" @click="confirmDeleteBrand(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Bildirim" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="brand"><b>{{brand.name}}</b> Markayı silmek istediğinizden emin misiniz?</span>
					</div>
					<template #footer>
						<Button label="Vazgeç" icon="pi pi-times" class="p-button-text" @click="deleteDialog = false"/>
						<Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteBrand" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteDialogAll" :style="{width: '450px'}" header="Bildirim" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="brand">Seçilen ürünleri silmek istediğinizden emin misiniz?</span>
					</div>
					<template #footer>
						<Button label="Vazgeç" icon="pi pi-times" class="p-button-text" @click="deleteDialogAll = false, selectedBrands=null"/>
						<Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteBrands" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import BrandService from '../../services/BrandService';

export default {
	data() {
		return {
			brands: null,
			brand: {},
			filters: {},
			selectedBrands: null,
            brandService: new BrandService(),
			submitted: false,
			deleteDialog: false,
			deleteDialogAll: false,
		}
	},
	created() {
		this.initFilters();
	},
	mounted() {
		this.brandService.getBrands().then(data => this.brands = data);
	},
	methods: {
		confirmDeleteBrand(brand) {
			this.brand = brand;
			this.deleteDialog = true;
		},
		deleteBrand() {
            this.brandService.deleteBrand(this.brand.id).then((response) => {
                if(response.success){
                    this.$toast.add({severity:'success', summary: 'Başarılı', detail: response.message, life: 10000});
                } else if(response.error) {
                    this.$toast.add({severity:'error', summary: 'Hata', detail: response.error.message, life: 10000});
                } else {
                    this.$toast.add({severity:'error', summary: 'Hata', detail: response.errors[0].message, life: 10000});
                }
            }).finally(() => {
                this.deleteDialog = false;
                this.brandService.getBrands().then(data => this.brands = data);
            });
		},

        confirmDeleteSelectedAll() {
			this.deleteDialogAll = true;
		},

        deleteBrands() {
            let count = 0;
            this.selectedBrands.forEach((brand) => {
                count++;
                this.brandService.deleteBrand(brand.id).then((response) => {
                    if(response.error) {
                        this.$toast.add({severity:'error', summary: 'Hata', detail: response.error.message, life: 10000});
                    }
                    if(response.errors){
                        this.$toast.add({severity:'error', summary: 'Hata', detail: response.errors[0].message, life: 10000});
                    }
                }).finally(() => {
                    this.deleteDialogAll = false;
                    this.brandService.getBrands().then(data => this.brands = data);
                });
            });
            this.$toast.add({severity:'success', summary: 'Başarılı', detail: `${count} Kayıt Silindi`, life: 10000});
		},

		initFilters() {
            this.filters = {
                'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
            }
        }
	}
}

</script>

<style scoped lang="scss">
</style>
