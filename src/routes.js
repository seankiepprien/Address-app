import NotFound from './views/NotFound.vue'
import AddressesList from './components/AddressesList.vue'
import Address from './components/Address.vue'
import AddAddress from './components/AddAddress.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: "/",
    alias: "/addresses",
    name: "addresses",
    component: AddressesList
  },
  {
    path: "/addresses/:id",
    name: "address-details",
    component: Address
  },
  {
    path: "/add",
    name: "add",
    component: AddAddress
  },
  { path: '/:path(.*)', component: NotFound },
]
