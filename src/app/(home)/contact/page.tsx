import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 font-serif mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We&apos;d love to hear from you.
            Our team is ready to help with any inquiries you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <Phone className="text-accent text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1">+216 12 345 678</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Monday-Friday, 9am-5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <Mail className="text-accent text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">contact@example.com</p>
                  <p className="text-gray-500 text-sm mt-1">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <MapPin className="text-accent text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600 mt-1">
                    123 Avenue Habib Bourguiba
                  </p>
                  <p className="text-gray-600">Tunis, Tunisia 1000</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "Facebook",
                      icon: (
                        <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                      ),
                      link: "https://facebook.com",
                    },
                    {
                      name: "Twitter",
                      icon: (
                        <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
                      ),
                      link: "https://facebook.com",
                    },
                    {
                      name: "Instagram",
                      icon: (
                        <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
                      ),
                      link: "https://facebook.com",
                    },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href={social.link}
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                      aria-label={`Follow us on ${social}`}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="h-96 w-full bg-gray-200 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.376515552516!2d10.20327677627174!3d36.85740556447212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34d2cea8acd7%3A0x8919939a56307851!2sAnnexe%20ENICarthage!5e0!3m2!1sen!2stn!4v1745518217369!5m2!1sen!2stn"
              width="100%"
              height="100%"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
