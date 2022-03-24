<template>
  <div class="flex flex-col m-auto">
    <div class="flex flex-col">
      <div class="flex flex-col items-center mb-3">
        <input
          type="text"
          name="name"
          id="name"
          class="border-t-0 border-l-0 border-r-0 bg-transparent text-center"
          placeholder="Search by Name"
          v-model="name"
        />

        <div>
          <button
            type="button"
            class="rounded bg-blue-400 text-white p-2 m-auto w-20 text-center mt-4"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center">
        <h4>Addresses List</h4>
        <ul class="list-none flex flex-col mt-2">
            <li class="" :class="{ active: index == currentIndex }" v-for="address in addresses" :key="address.id" @click="setActiveAddress(address, index)">
                <strong>{{ address.name }}</strong>
            </li>
        </ul>
        <button class="bg-red-400 text-gray-200 p-2 m-auto w-28 text-center mt-4 rounded" @click="removeAllAddresses">Remove All</button>
    </div>
    <div class="flex flex-col items-center mt-4">
        <div v-if="currentAddress" class="flex flex-col border-2 p-2">
        <div>
            <label><strong>Name: </strong></label> {{ currentAddress.name }}
        </div>
        <div>
             <label><strong>Address: </strong></label> {{ currentAddress.address }}
        </div>
        <div>
            <label><strong>Phone Number: </strong></label> {{ currentAddress.phoneNumber }}
        </div>
        <a class="rounded bg-blue-400 text-white p-2 m-auto w-16 text-center mt-4" :href="'/addresses/' + currentAddress.id">Edit</a>
    </div>
    <div v-else>
        <br />
        <p>Please click on an Address...</p>
    </div>
  </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
import AddressDataService from '../services/AddressDataService'

export default {
    setup() {
        const addresses = ref([])
        const currentAddress = ref(null)
        const currentIndex = ref(-1)
        const name = ref("")
        const dataService = AddressDataService
        function retrieveAddresses() {
            AddressDataService.getAll()
            .then(res => {
                addresses.value = res.data
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        }
        function refreshList() {
            retrieveAddresses();
            currentAddress.value = null;
            currentIndex.value = -1
        }
        function setActiveAddress(address, index) {
            currentAddress.value = address;
            currentIndex.value = index;
        }
        function removeAllAddresses() {
            dataService.deleteAll()
            .then(res => {
                console.log(res.data)
                refreshList()
            })
            .catch(err => {
                console.log(err)
            });
        }
        function searchName() {
            dataService.findByName(name.value)
            .then(res => {
                addresses.value = res.data;
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        }
        onMounted(() => {
            retrieveAddresses();
        })
        return { addresses, currentAddress, currentIndex, name, retrieveAddresses, refreshList, setActiveAddress, removeAllAddresses, searchName, dataService }
    },
}
</script>