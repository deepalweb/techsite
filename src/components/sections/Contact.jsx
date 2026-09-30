import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Phone,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { phone, waLink } from "../../data/content.js";

export default function Contact({ initialService = "" }) {
  const { t } = useTranslation();
  const options = [
    ...t("studio.problems", { returnObjects: true }).map(({ id, title }) => ({
      id,
      label: title,
    })),
    ...t("request.services", { returnObjects: true }).filter(({ id }) =>
      ["business", "digital", "other"].includes(id),
    ),
  ];
  const preferredService =
    initialService === "network" ? "wifi" : initialService;
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: options.some(({ id }) => id === preferredService)
      ? preferredService
      : "",
    issue: "",
    name: "",
    phone: "",
    location: "",
    preference: "visit",
  });
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(false);
  const heading = useRef(null);
  const previous = useRef(0);
  useEffect(() => {
    if (previous.current !== step) {
      heading.current?.focus();
      previous.current = step;
    }
  }, [step]);
  const labels = t("request.steps", { returnObjects: true });
  const preferences = t("request.preferences", { returnObjects: true });
  const update = (e) => {
    setError(false);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const service = options.find((x) => x.id === data.service)?.label || "";
  const preference =
    preferences.find((x) => x.id === data.preference)?.label || "";
  const message = `Hi DR TECH, I would like IT support.\n\nService: ${service}\nIssue: ${data.issue.trim()}\nName: ${data.name.trim()}\nPhone: ${data.phone.trim()}\nLocation: ${data.location.trim()}\nPreference: ${preference}\n\nPlease confirm availability and an estimate.`;
  const field = (name, label, props = {}) => (
    <label className="request-label">
      {label}
      <input
        name={name}
        value={data[name]}
        onChange={update}
        required
        maxLength={120}
        {...props}
      />
    </label>
  );
  function next(e) {
    e.preventDefault();
    const valid =
      step === 0
        ? options.some((option) => option.id === data.service)
        : step === 1
          ? data.issue.trim().length >= 10
          : data.name.trim() &&
            data.location.trim() &&
            /^[+0-9() -]{7,20}$/.test(data.phone.trim()) &&
            data.phone.replace(/\D/g, "").length >= 7;
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setStep((s) => Math.min(3, s + 1));
  }
  return (
    <section
      id="contact"
      className="request-section px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl request-layout">
        <div>
          <p className="eyebrow-label">{t("experience.getHelp")}</p>
          <h2 className="text-h1 mt-4">{t("request.title")}</h2>
          <p className="mt-5 text-body text-steel">{t("request.intro")}</p>
          <div className="request-assurance">
            <ShieldCheck size={22} />
            <p>{t("request.assurance")}</p>
          </div>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-3 font-bold mt-8"
          >
            <Phone size={18} />
            {t("contact.ctaCall")}
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="request-panel">
          <ol className="request-progress" aria-label={t("request.progress")}>
            {labels.map((label, i) => (
              <li
                key={label}
                className={i <= step ? "is-active" : ""}
                aria-current={i === step ? "step" : undefined}
              >
                <span>{i < step ? <Check size={15} /> : i + 1}</span>
                <small>{label}</small>
              </li>
            ))}
          </ol>
          <div className="request-track">
            <motion.div
              animate={{ width: `${(step + 1) * 25}%` }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            />
          </div>
          <h3 ref={heading} tabIndex={-1} className="request-step-title">
            {t(`request.titles.${step}`)}
          </h3>
          <AnimatePresence mode="wait" initial={false}>
            <motion.form
              key={step}
              onSubmit={next}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.18 }}
            >
              {step === 0 && (
                <fieldset>
                  <legend className="sr-only">{labels[0]}</legend>
                  <div className="request-options">
                    {options.map((option) => (
                      <label
                        key={option.id}
                        className={data.service === option.id ? "selected" : ""}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={option.id}
                          checked={data.service === option.id}
                          onChange={update}
                          required
                        />
                        <span>{option.label}</span>
                        <ArrowRight size={16} />
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 1 && (
                <>
                  <label className="request-label">
                    {t("request.issue")}
                    <textarea
                      name="issue"
                      rows={5}
                      value={data.issue}
                      onChange={update}
                      required
                      minLength={10}
                      maxLength={1500}
                      placeholder={t("request.issuePlaceholder")}
                    />
                  </label>
                  <p className="request-hint">{t("request.photoHint")}</p>
                </>
              )}
              {step === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {field("name", t("contact.form.nameLabel"), {
                    autoComplete: "name",
                    pattern: ".*\\S.*",
                  })}
                  {field("phone", t("request.phone"), {
                    type: "tel",
                    autoComplete: "tel",
                    maxLength: 20,
                  })}
                  {field("location", t("request.location"), {
                    autoComplete: "address-level2",
                    pattern: ".*\\S.*",
                  })}
                  <label className="request-label">
                    {t("request.preference")}
                    <select
                      name="preference"
                      value={data.preference}
                      onChange={update}
                    >
                      {preferences.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              {step === 3 && (
                <>
                  <dl className="request-summary">
                    {[
                      [labels[0], service],
                      [t("request.issue"), data.issue],
                      [t("contact.form.nameLabel"), data.name],
                      [t("request.phone"), data.phone],
                      [t("request.location"), data.location],
                      [t("request.preference"), preference],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="request-hint">{t("request.handoff")}</p>
                  {opened && (
                    <div role="status" className="request-status">
                      <Check size={20} />
                      {t("request.opened")}
                    </div>
                  )}
                </>
              )}
              {error && (
                <p role="alert" className="mt-4 text-sm text-red-700">
                  {t("request.validation")}
                </p>
              )}
              <div className="request-actions">
                {step > 0 && (
                  <button
                    type="button"
                    className="request-back"
                    onClick={() => {
                      setOpened(false);
                      setError(false);
                      setStep((s) => s - 1);
                    }}
                  >
                    <ArrowLeft size={17} />
                    {t("request.back")}
                  </button>
                )}
                {step < 3 ? (
                  <button className="button-primary ml-auto" type="submit">
                    {t("request.next")}
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <a
                    href={waLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary ml-auto"
                    onClick={() => setOpened(true)}
                  >
                    <MessageCircle size={18} />
                    {t("request.send")}
                  </a>
                )}
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
