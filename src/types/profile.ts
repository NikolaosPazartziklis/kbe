export interface StudentProfile {
  firstName: string
  lastName: string
  email: string
  studentId: string
  course: string
  semester: string
  status: 'Aktiv' | 'Beurlaubt' | 'Abgeschlossen'
  faculty: string
  phone: string
  location: string
}
