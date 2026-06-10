const inputClass =
  'focus-ring w-full rounded-md border border-emeraldDeep/14 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40';

export default function ContactForm() {
  return (
    <form className="grid gap-4 rounded-lg border border-emeraldDeep/10 bg-white p-6 shadow-premium">
      <input className={inputClass} type="text" name="name" placeholder="Name" aria-label="Name" />
      <input className={inputClass} type="tel" name="mobile" placeholder="Mobile Number" aria-label="Mobile Number" />
      <input className={inputClass} type="email" name="email" placeholder="Email" aria-label="Email" />
      <select className={inputClass} name="vehicle" aria-label="Vehicle Requirement" defaultValue="">
        <option value="" disabled>
          Vehicle Requirement
        </option>
        <option>Two Wheeler Finance</option>
        <option>Four Wheeler Finance</option>
        <option>Used Vehicle Finance</option>
        <option>Documentation Assistance</option>
        <option>Insurance Guidance</option>
      </select>
      <textarea className={`${inputClass} min-h-32 resize-y`} name="message" placeholder="Message" aria-label="Message" />
      <button
        type="submit"
        className="focus-ring gold-gradient min-h-12 rounded-md px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-charcoal transition hover:-translate-y-0.5"
      >
        Send Enquiry
      </button>
    </form>
  );
}
