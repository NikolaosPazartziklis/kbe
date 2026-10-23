<script setup lang="ts">
defineProps<{
  firstName: string
  lastName: string
  isEditing: boolean
}>()

const emit = defineEmits<{
  edit: []
}>()
</script>

<template>
  <section class="profile-header">
    <div class="avatar-wrap">
      <div class="avatar" aria-label="Profilbild von Anna Weber">
        <span>{{ firstName.charAt(0) }}{{ lastName.charAt(0) }}</span>
      </div>
      <button v-if="isEditing" class="avatar-edit" type="button" aria-label="Profilbild ändern">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-10h-2.17l-1.2-1.8A2 2 0 0 0 14.97 3H9.03a2 2 0 0 0-1.66 1.2L6.17 6H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
        </svg>
      </button>
    </div>
    <div class="profile-heading">
      <div class="eyebrow">Studentenprofil</div>
      <h1>{{ firstName }} {{ lastName }}</h1>
      <p>Willkommen zurück in deinem Campus Portal.</p>
    </div>
    <button v-if="!isEditing" class="button button-light header-action" type="button" @click="emit('edit')">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06ZM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-.71-.29ZM14.06 6.54 3 17.59V21h3.41L17.46 9.94l-3.4-3.4Z" /></svg>
      Bearbeiten
    </button>
  </section>
</template>
