'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { Bounce, toast } from 'react-toastify';
import { LuPhone, LuMessageSquare, LuMessageCircle, LuMail, LuSend } from 'react-icons/lu';

const contactMethods = [
  {
    icon: LuPhone,
    label: 'Telefon',
    value: '+381 63 383 393',
    action: () => { window.location.href = 'tel:+38163383393'; },
  },
  {
    icon: LuMessageSquare,
    label: 'Viber',
    value: 'Pošaljite poruku',
    action: () => window.open('viber://contact/?number=+38163383393', '_blank'),
  },
  {
    icon: LuMessageCircle,
    label: 'WhatsApp',
    value: 'Pošaljite poruku',
    action: () => window.open('https://wa.me/38163383393', '_blank'),
  },
  {
    icon: LuMail,
    label: 'Email',
    value: 'avalahomeconcept@gmail.com',
    action: () => { window.location.href = 'mailto:avalahomeconcept@gmail.com'; },
  },
];

export const Contact = () => {
  const form = useRef();
  const router = useRouter();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_479xn4w', 'template_f65leyq', form.current, 'yXqwmaxm-PpofwIqK')
      .then(
        () => router.push('/thank-you'),
        () => toast.error('Problem sa slanjem poruke. Pokušajte ponovo.', {
          position: 'bottom-center',
          autoClose: 5000,
          theme: 'light',
          transition: Bounce,
        })
      );
  };

  return (
    <section className="py-12 md:py-24 bg-bg-dark">
      <div className="safe-zone">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-start">

          {/* Left — info */}
          <div className="flex flex-col gap-10" data-reveal>
            <div>
              <span className="overline">Stupite u kontakt</span>
              <div className="overline-bar" />
              <h2
                className="text-text-light"
                style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
              >
                Razgovarajmo o{' '}
                <em>vašem domu</em>
              </h2>
              <p className="text-text-light/50 font-light text-sm leading-relaxed mt-5 max-w-sm">
                Naš tim je dostupan radnim danima od 09–17h. Odgovorićemo u najkraćem roku.
              </p>
            </div>

            {/* Contact methods */}
            <div className="flex flex-col gap-1">
              {contactMethods.map(({ icon: Icon, label, value, action }, i) => (
                <button
                  key={i}
                  onClick={action}
                  className="flex items-center gap-5 py-4 border-b border-border-dark text-left group hover:border-accent/40 transition-colors duration-150"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-border-dark rounded-full text-text-light/40 group-hover:border-accent group-hover:text-accent transition-all duration-200 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p
                      className="text-text-light/35 text-[0.68rem] font-medium tracking-[0.15em] uppercase mb-0.5"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {label}
                    </p>
                    <p className="text-text-light/70 text-sm font-light group-hover:text-text-light transition-colors duration-150">
                      {value}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-0" data-reveal>
            <div className="border border-border-dark p-4 md:p-8 flex flex-col gap-5 md:gap-7">

              {[
                { name: 'firstName',     type: 'text',  placeholder: 'Vaše ime' },
                { name: 'contactNumber', type: 'tel',   placeholder: 'Broj telefona' },
                { name: 'contactEmail',  type: 'email', placeholder: 'Email adresa' },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <input
                    {...field}
                    required
                    className="input peer"
                    placeholder=" "
                    id={field.name}
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute left-0 top-3 text-text-light/35 text-sm font-light pointer-events-none transition-all duration-200 peer-focus:text-[0.7rem] peer-focus:-top-3 peer-focus:text-accent peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-text-light/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {field.placeholder}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder=" "
                  id="message"
                  className="input peer resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-text-light/35 text-sm font-light pointer-events-none transition-all duration-200 peer-focus:text-[0.7rem] peer-focus:-top-3 peer-focus:text-accent peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-text-light/50"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Poruka
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary group self-start mt-2"
              >
                <LuSend className="w-4 h-4" />
                Pošaljite poruku
                <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
              </button>

            </div>
          </form>

        </div>
      </div>
    </section>
  );
};
