<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-r from-gray-50 to-white">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white p-6 space-y-8 shadow-xl">
      <h1 class="text-3xl font-bold text-white uppercase tracking-widest">ERP System</h1>
      <nav class="space-y-4">
        <a href="#" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">
          Dashboard
        </a>
        <a href="#" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">
          Sales Management
        </a>
        <a href="#" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">
          Reports
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
      <!-- Header -->
      <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Shipment Preparation Form</h2>
        <div class="flex space-x-4">
          <button class="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-lg hover:bg-blue-600 hover:shadow-lg transition duration-300">
            Save
          </button>
          <button class="px-5 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 hover:shadow-lg transition duration-300">
            Cancel
          </button>
        </div>
      </header>

      <!-- Main Body -->
      <div class="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-sm mb-8">
        <!-- Form Fields -->
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Delivery Date</label>
            <input type="date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300">
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-sm">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100 text-gray-700 uppercase tracking-wide">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium">No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium">Product Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium">Specification</th>
            <th class="px-6 py-3 text-right text-xs font-medium">Quantity</th>
            <th class="px-6 py-3 text-right text-xs font-medium">Unit Price</th>
            <th class="px-6 py-3 text-right text-xs font-medium">Total Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium">Remarks</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-gray-800">
          <tr>
            <td class="px-6 py-4">1</td>
            <td class="px-6 py-4">Product A</td>
            <td class="px-6 py-4">S</td>
            <td class="px-6 py-4 text-right">10</td>
            <td class="px-6 py-4 text-right">$100</td>
            <td class="px-6 py-4 text-right">$1,000</td>
            <td class="px-6 py-4">Notes</td>
          </tr>
          <!-- More rows -->
          </tbody>
        </table>
      </div>
    </main>
  </div>



</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
