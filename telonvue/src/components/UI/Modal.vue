<template>
    <Dialog :open="isOpen" @close="toggleModal">

        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-gray/30" aria-hidden="true"/>

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
        <!-- The actual dialog panel -->

            <DialogPanel class="bg-moonstone p-5 rounded-md w-100">
                <DialogTitle class="text-2xl">Form Upload</DialogTitle>
                <DialogDescription>
                    <Form>
                        <div class="flex flex-col">
                            <TextArea label="Tweet"/>
                        </div>
                        <div class="flex flex-col">
                            <label for="uploadfile">Upload File</label>
                            <input type="file" id="uplpadFile">
                        </div>
                    </Form>


                </DialogDescription>
                <div class="flex gap-5">
                    <Button @handle-click="$emit('closeModal')" name="Close"/> 
                    <Button @handle-click="$emit('uploadButton')" name="Upload"/> 
                </div>
            </DialogPanel>
        </div>


    </Dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
  } from '@headlessui/vue'
  import Button from '@/components/UI/Button.vue'
  import Form from '@/components/UI/Form.vue'
  import TextArea from '@/components/UI/CustomeTextarea.vue'


  defineProps(['isOpen '])

  defineEmits(['closeModal'])
  const isOpen = ref(true)

  
</script>