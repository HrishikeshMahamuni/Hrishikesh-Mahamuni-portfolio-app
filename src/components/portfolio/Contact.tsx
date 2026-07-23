"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send,  MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const serviceID = "service_0jte8qr";
    const contactForm = "template_mztvvjm"
    const autoReply = "template_o5k2via";
    const publicKey = "v6lOIxuky17ZjN7Nz"

    const templateParams = {
      from_name : formState.name,
      from_email : formState.email,
      subject : formState.subject,
      to_name : "Hrishikesh_Mahamuni",
      message : formState.message,

    }

    try {
// contact form Message send
    const res1 = await emailjs.send(
      serviceID,
      contactForm,
      templateParams,
      publicKey,
    );
    console.log("Contact Form -- ",res1)

    // Auto Reply Message Template 
    const res2 = await emailjs.send(
      serviceID,
      autoReply,
      templateParams,
      publicKey,
    );
    console.log("Auto Reply -- ",res2)

    setStatus("success")

    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });


    // Simulate sending or submit to custom API/mailto fallback
    setTimeout(() => {   
      setStatus("idle")
    }, 1500);

    } 
    catch (error) {
    console.error("Email Error:", error);
    setStatus("error");
  }
  };

  const contactDetails = [
    {
      icon: Mail,
      title: "Email Me",
      value: "hrushikeshm12@gmail.com",
      href: "mailto:hrushikeshm12@gmail.com",
      color: "text-purple-400 bg-purple-500/5 border-purple-500/10",
    },
    {
      icon: Phone,
      title: "Call Me",
      value: "+91 77449 73736",
      href: "tel:+917744973736",
      color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10",
    },
    {
      icon: MapPin,
      title: "My Location",
      value: "Pune, Maharashtra, India",
      href: "https://maps.google.com",
      color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark-bg/60 border-t border-white/5 text-center">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-950/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-indigo-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Contact Me</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Contact Cards & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-white">Let's discuss something great.</h4>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to shoot a message!
              </p>
            </div>

            {/* Detail Blocks */}
            <div className="space-y-4">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={idx}
                    href={detail.href}
                    target={detail.icon === MapPin ? "_blank" : undefined}
                    rel={detail.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="glass-panel glass-panel-hover p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 group border-white/5"
                  >
                    <div className={`p-3.5 rounded-xl border ${detail.color} group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h5 className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                        {detail.title}
                      </h5>
                      <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-200">
                        {detail.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links Block */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Follow Me</h5>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/hrushikesh-mahamuni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/hrushikesh-mahamuni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col gap-6 h-full text-left"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <MessageSquare className="text-purple-400" size={20} />
                <h4 className="text-lg font-bold text-white">Send Me a Message</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-left text-xs font-semibold text-gray-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-left text-xs font-semibold text-gray-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-left text-xs font-semibold text-gray-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-left text-xs font-semibold text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`glow-btn py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  status === "sending" ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {status === "sending" ? (
                  <>Sending...</>
                ) : status === "success" ? (
                  <>Message Sent Successfully!</>
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
