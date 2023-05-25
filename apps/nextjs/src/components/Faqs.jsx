import Link from 'next/link'

import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: "What is a hadith?",
      answer: "A hadith is a saying or action attributed to the Prophet Muhammad, peace be upon him, and his companions."
    },
    {
      question: "What languages are available in the app?",
      answer: "The app offers hadiths in three languages: Arabic, Malay, and English."
    },
    {
      question: "Are the translations accurate?",
      answer: "Yes, we take great care to ensure that the translations are accurate and reliable."
    },
  ],
  [
    {
      question: "Can I search for specific hadiths?",
      answer: "Yes, the app includes a powerful search feature that allows you to search for hadiths by keyword."
    },
    {
      question: "Can I bookmark my favorite hadiths?",
      answer: "Yes, you can bookmark any hadith and easily access it later."
    },
    {
      question: "Is the app free?",
      answer: "Yes, the app is completely free to download and use."
    },
  ],
  [
    {
      question: "Is the app available on both iOS and Android?",
      answer: "Yes, the app is available on both the App Store and Google Play."
    },
    {
      question: "Are new hadiths added to the app regularly?",
      answer: "Yes, we are constantly updating the app with new hadiths and other content."
    },
    {
      question: "Can I share hadiths with others?",
      answer: "Yes, the app allows you to easily share hadiths with your friends and family via social media, email, or text message."
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <Link
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </Link>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
