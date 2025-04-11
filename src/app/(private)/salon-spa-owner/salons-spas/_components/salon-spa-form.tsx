
interface SalonFormProps {
  initialValues? : any
  formType? : 'add' | 'edit'
}
    

function SalonSpaForm({ initialValues, formType } : SalonFormProps) {
  return (
    <div className="mt-7">SalonForm</div>
  )
}
export default SalonSpaForm