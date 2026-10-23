<script setup lang="ts">
import { computed, ref } from 'vue'
import ProfileHeader from './components/ProfileHeader.vue'
import ProfileField from './components/ProfileField.vue'
import type { StudentProfile } from './types/profile'

const profile = ref<StudentProfile>({
  firstName: 'Anna',
  lastName: 'Weber',
  email: 'anna.weber@hochschule.de',
  studentId: '20231247',
  course: 'Medieninformatik',
  semester: '4. Semester',
  status: 'Aktiv',
  faculty: 'Fakultät Informatik',
  phone: '+49 170 1234567',
  location: 'Berlin, Deutschland',
})

const draft = ref<StudentProfile>({ ...profile.value })
const isEditing = ref(false)
const showSaved = ref(false)

const fullName = computed(() => `${profile.value.firstName} ${profile.value.lastName}`)
const initials = computed(() => `${profile.value.firstName.charAt(0)}${profile.value.lastName.charAt(0)}`)

function startEditing() {
  draft.value = { ...profile.value }
  isEditing.value = true
}

function cancelEditing() {
  draft.value = { ...profile.value }
  isEditing.value = false
}

function saveProfile() {
  profile.value = { ...draft.value }
  isEditing.value = false
  showSaved.value = true
  window.setTimeout(() => {
    showSaved.value = false
  }, 3200)
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Campus Portal Startseite">
        <span class="brand-mark">c</span>
        <span>campus<span class="brand-muted">portal</span></span>
      </a>
      <div class="topbar-right">
        <button class="icon-button notification" type="button" aria-label="Benachrichtigungen">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></svg>
          <span class="notification-dot"></span>
        </button>
        <div class="mini-user">
          <div class="mini-avatar">{{ initials }}</div>
          <span>{{ fullName }}</span>
          <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
    </header>

    <div class="page-layout">
      <aside class="sidebar">
        <div class="sidebar-label">Übersicht</div>
        <nav aria-label="Hauptnavigation">
          <a href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" /><path d="M9 21v-6h6v6" /></svg>Dashboard</a>
          <a href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>Mein Studium</a>
          <a class="active" href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>Mein Profil</a>
          <a href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM8 2v4M16 2v4M4 10h16" /></svg>Kalender</a>
        </nav>
        <div class="sidebar-label sidebar-help-label">Service</div>
        <nav aria-label="Service Navigation">
          <a href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-1 .8-1.8 1.2-1.8 2.7M12 17.5v.1" /></svg>Hilfe &amp; Kontakt</a>
        </nav>
        <div class="sidebar-bottom">
          <div class="support-card"><div class="support-icon">?</div><strong>Brauchst du Hilfe?</strong><span>Wir sind für dich da.</span><a href="#">Support kontaktieren <span>→</span></a></div>
          <div class="sidebar-footer">© 2024 Campus Portal</div>
        </div>
      </aside>

      <main class="main-content">
        <div class="breadcrumb"><span>Startseite</span><b>/</b><strong>Mein Profil</strong></div>
        <ProfileHeader :first-name="profile.firstName" :last-name="profile.lastName" :is-editing="isEditing" @edit="startEditing" />

        <div v-if="showSaved" class="toast" role="status">
          <span class="toast-check">✓</span><span><strong>Änderungen gespeichert</strong><small>Dein Profil wurde erfolgreich aktualisiert.</small></span>
          <button type="button" aria-label="Meldung schließen" @click="showSaved = false">×</button>
        </div>

        <form class="profile-grid" @submit.prevent="saveProfile">
          <section class="card personal-card">
            <div class="card-heading"><div><h2>Persönliche Daten</h2><p>Deine Kontaktdaten und persönlichen Informationen</p></div><span class="card-icon">♙</span></div>
            <div class="fields two-columns">
              <ProfileField v-model="draft.firstName" label="Vorname" :disabled="!isEditing" />
              <ProfileField v-model="draft.lastName" label="Nachname" :disabled="!isEditing" />
              <ProfileField v-model="draft.email" label="E-Mail-Adresse" type="email" :disabled="!isEditing" />
              <ProfileField v-model="draft.studentId" label="Matrikelnummer" :disabled="true" hint="Nicht änderbar" />
              <ProfileField v-model="draft.phone" label="Telefonnummer" type="tel" :disabled="!isEditing" />
              <ProfileField v-model="draft.location" label="Wohnort" :disabled="!isEditing" />
            </div>
          </section>

          <section class="card study-card">
            <div class="card-heading"><div><h2>Studium</h2><p>Informationen zu deinem aktuellen Studium</p></div><span class="card-icon">▣</span></div>
            <div class="fields">
              <ProfileField v-model="draft.course" label="Studiengang" :disabled="!isEditing" />
              <ProfileField v-model="draft.faculty" label="Fakultät" :disabled="!isEditing" />
              <div class="field-row">
                <ProfileField v-model="draft.semester" label="Fachsemester" :disabled="!isEditing" />
                <label class="field"><span class="field-label">Studierendenstatus</span><select v-model="draft.status" :disabled="!isEditing"><option>Aktiv</option><option>Beurlaubt</option><option>Abgeschlossen</option></select></label>
              </div>
            </div>
            <div class="study-status"><span class="status-dot"></span><span><strong>Immatrikuliert</strong><small>Seit 01.10.2022</small></span></div>
          </section>
        </form>

        <div v-if="isEditing" class="action-bar">
          <span>Deine Änderungen werden erst nach dem Speichern übernommen.</span>
          <div><button class="button button-ghost" type="button" @click="cancelEditing">Abbrechen</button><button class="button button-primary" type="button" @click="saveProfile"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h12l2 2v14H5V4Zm3 0v5h7V4M8 20v-5h8v5" /></svg>Änderungen speichern</button></div>
        </div>
        <p class="privacy-note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>Deine Daten werden sicher und vertraulich behandelt.</p>
      </main>
    </div>
  </div>
</template>

<style src="./styles.css"></style>
