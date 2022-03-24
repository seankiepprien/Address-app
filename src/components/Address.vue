<template>
    <div v-if="currentAddress" class="flex flex-col">
        <h4>Address</h4>
        <form class="flex flex-col">
            <div class="">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" v-model="currentAddress.name" class="text-center border-t-0 border-r-0 border-l-0"/>
            </div>
            <div class="">
                <label for="address">Address</label>
                <input type="text" name="address" id="address" v-model="currentAddress.address" class="text-center border-t-0 border-r-0 border-l-0"/>
            </div>
            <div class="">
                <label for="phoneNumber">Phone Number</label>
                <input type="text" name="phoneNumber" id="phoneNumber" v-model="currentAddress.phoneNumber" class="text-center border-t-0 border-r-0 border-l-0"/>
            </div>
        </form>
        <button class="bg-red-400 text-gray-200 p-2 m-auto w-28 text-center mt-4 rounded" @click="deleteAddress">Delete</button>
        <button class="rounded bg-blue-400 text-white p-2 m-auto w-16 text-center mt-4" @click="updateAddress">Update</button>
        <p>{{ message }}</p>
    </div>
    <div v-else>
        <br />
        <p>Please click on an Address</p>
    </div>
</template>
<script>
import AddressDataService from '../services/AddressDataService'
import { ref, onMounted, } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
    setup() {
        const dataService = AddressDataService
        const currentAddress = ref(null)
        const message = ref("")
        const router = useRouter()
        const route = useRoute()

        function getAddress(id) {
            dataService.get(id)
            .then(res => {
                currentAddress.value = res.data
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        }      
        function updateAddress() {
            dataService.update(currentAddress.value.id, currentAddress.value)
            .then(res => {
                console.log(res.data)
                message.value = "The address was updated successfully!"
            })
            .catch(err => {
                console.log(err)
            });
        }
        function deleteAddress() {
            console.log(currentAddress.value.id)
            dataService.delete(currentAddress.value.id)
            .then(res => {
                console.log(res.data)
                router.push({ name: "addresses" })
            })
        }
        onMounted(() => {
            message.value = ""
            getAddress(route.params.id)
        })
        return { dataService, router, route, currentAddress, message, getAddress, updateAddress, deleteAddress }
    },
}
</script>