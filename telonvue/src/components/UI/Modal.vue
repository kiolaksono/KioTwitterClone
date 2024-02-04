<template>
    <Dialog :open="showModal" @close="$emit('toggleModal')">

        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-gray/30" aria-hidden="true"/>

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
        <!-- The actual dialog panel -->

            <DialogPanel class="bg-moonstone p-5 rounded-md w-100">
                <slot>

                </slot>
            </DialogPanel>
        </div>


    </Dialog>
</template>

<script setup>
defineProps(['modalTitle','modalDesc','showModal'])
defineEmits(['toggleModal'])

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
  
  
</script>