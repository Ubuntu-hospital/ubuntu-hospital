"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { faqContent } from "@/content/faqs";

export default function FaqList() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-60px",
      }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
      className="faq-list"
    >
      {faqContent.items.map((item, index) => {
        const isActive = index === activeIndex;
        const answerId = `faq-answer-${index}`;

        return (
          <motion.article
            variants={{
              hidden: {
                opacity: 0,
                y: 28,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            className={isActive ? "faq-item active" : "faq-item"}
            key={item.question}
            layout
          >
            <button
              type="button"
              className="faq-question"
              aria-expanded={isActive}
              aria-controls={answerId}
              onClick={() =>
                setActiveIndex((current) => (current === index ? -1 : index))
              }
            >
              <span className="faq-index">0{index + 1}</span>

              <strong>{item.question}</strong>

              <span className="faq-toggle">
                {isActive ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isActive ? (
                <motion.div
                  id={answerId}
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="faq-answer"
                >
                  <p>{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
