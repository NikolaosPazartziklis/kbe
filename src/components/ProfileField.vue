<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string
  type?: string
  disabled?: boolean
  hint?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="field">
    <span class="field-label">{{ label }}</span>
    <input
      :value="modelValue"
      :type="type ?? 'text'"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="hint" class="field-hint">{{ hint }}</span>
  </label>
</template>
