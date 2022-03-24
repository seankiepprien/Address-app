<template>
  <div class="bg-grey-400 rounded border-2 border-grey-800 p-4 submit-form">
    <div v-if="!submitted">
      <div class="flex">
        <label for="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="address.name"
          class="border-t-0 border-l-0 border-r-0 bg-transparent"
        />
      </div>
      <div class="flex">
        <label for="address">Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          v-model="address.address"
          class="border-t-0 border-l-0 border-r-0 bg-transparent"
        />
      </div>
      <div class="flex">
        <label for="address">Phone Number:</label>
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          v-model="address.phoneNumber"
          class="border-t-0 border-l-0 border-r-0 bg-transparent"
        />
      </div>
      <button @click="saveAddress" class="bg-green-400 text-gray-200 rounded">Submit</button>
    </div>
    <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="bg-blue-400 text-gray-200 rounded" @click="newAddress">Add</button>
    </div>
  </div>
</template>
<script>
import AddressDataService from '../services/AddressDataService'
import { ref, reactive, onMounted } from 'vue'

export default {
    setup() {
        const address = reactive ({
            name: "",
            address: "",
            phoneNumber: null
        })
        const submitted = ref(false)
        function saveAddress() {
            let data = {
                name: address.name,
                address: address.address,
                phoneNumber: address.phoneNumber
            };
            AddressDataService.create(data)
            .then(res => {
                address.id = res.data.id;
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        }
        function newAddress() {
            submitted = false
            address = {}
        }
        return { address, newAddress, submitted, saveAddress }
}
}
</script>
<style scoped>
.submit-form {
    max-width: 750px;
}
</style>
