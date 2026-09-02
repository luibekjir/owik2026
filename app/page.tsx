"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";

/* ─── Foto ─────────────────────────────────────────────────── */
const images = [
  "PHOTO-2026-09-03-03-30-22 10.jpg",
  "PHOTO-2026-09-03-03-30-22 11.jpg",
  "PHOTO-2026-09-03-03-30-22 12.jpg",
  "PHOTO-2026-09-03-03-30-22 2.jpg",
  "PHOTO-2026-09-03-03-30-22 3.jpg",
  "PHOTO-2026-09-03-03-30-22 4.jpg",
  "PHOTO-2026-09-03-03-30-22 5.jpg",
  "PHOTO-2026-09-03-03-30-22 6.jpg",
  "PHOTO-2026-09-03-03-30-22 7.jpg",
  "PHOTO-2026-09-03-03-30-22 8.jpg",
  "PHOTO-2026-09-03-03-30-22 9.jpg",
  "PHOTO-2026-09-03-03-30-22.jpg",
  "PHOTO-2026-09-03-03-30-23 10.jpg",
  "PHOTO-2026-09-03-03-30-23 11.jpg",
  "PHOTO-2026-09-03-03-30-23 12.jpg",
  "PHOTO-2026-09-03-03-30-23 2.jpg",
  "PHOTO-2026-09-03-03-30-23 3.jpg",
  "PHOTO-2026-09-03-03-30-23 4.jpg",
  "PHOTO-2026-09-03-03-30-23 5.jpg",
  "PHOTO-2026-09-03-03-30-23 6.jpg",
  "PHOTO-2026-09-03-03-30-23 7.jpg",
  "PHOTO-2026-09-03-03-30-23 8.jpg",
  "PHOTO-2026-09-03-03-30-23 9.jpg",
  "PHOTO-2026-09-03-03-30-23.jpg",
];

const row1 = images.slice(0, 8);
const row2 = images.slice(8, 16);
const row3 = images.slice(16, 24);

/* ─── Target Waktu ─────────────────────────────────────────── */
// 3 September 2026, 04:25 WIB
const TARGET_DATE = new Date("2026-09-03T04:25:00+07:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const distance = TARGET_DATE - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
  };
}

/* ─── Timer Unit dengan efek tick ──────────────────────────── */
function TimerNumber({ value, label }: { value: number; label: string }) {
  const [ticking, setTicking] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      setTicking(true);
      const t = setTimeout(() => setTicking(false), 200);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className={styles.countdownUnit}>
      <span className={`${styles.countdownNumber} ${ticking ? styles.ticking : ""}`}>
        {String(value).padStart(2, "0")}
      </span>
      <span className={styles.countdownUnitLabel}>{label}</span>
    </div>
  );
}

/* ─── Carousel Background ────────────────────────────────────── */
function CarouselBg() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.track}>
          {row1.map((img, i) => (
            <div key={`r1a-${i}`} className={styles.imageContainer}>
              <Image src={`/Owik 2026/${img}`} alt="" fill sizes="50vw" className="object-cover" priority={i < 3} />
            </div>
          ))}
          {row1.map((img, i) => (
            <div key={`r1b-${i}`} className={styles.imageContainer}>
              <Image src={`/Owik 2026/${img}`} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.trackReverse}>
          {row2.map((img, i) => (
            <div key={`r2a-${i}`} className={styles.imageContainer}>
              <Image src={`/Owik 2026/${img}`} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          ))}
          {row2.map((img, i) => (
            <div key={`r2b-${i}`} className={styles.imageContainer}>
              <Image src={`/Owik 2026/${img}`} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.row} ${styles.row3}`}>
        <div className={styles.track}>
          {row3.map((img, i) => (
            <div key={`r3a-${i}`} className={styles.imageContainer}>
              <Image src={`/Owik 2026/${img}`} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          ))}
          {row3.map((img, i) => (
            <div key={`r3b-${i}`} className={styles.imageContainer}>
              <Image src={`/Owik 2026/${img}`} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Ornament divider ───────────────────────────────────── */
function OrnamentDivider() {
  return (
    <div className={styles.ornamentDivider}>
      <div className={styles.ornamentStar} />
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setIsMounted(true);

    if (TARGET_DATE <= Date.now()) {
      setIsUnlocked(true);
      return;
    }

    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      const distance = TARGET_DATE - Date.now();
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setShowTransition(true);
        setTimeout(() => {
          setIsUnlocked(true);
          setShowTransition(false);
        }, 2900);
      } else {
        setTimeLeft(getTimeLeft());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  /* ── TRANSITION ──────────────────────────────────────────── */
  if (showTransition) {
    return (
      <div className={styles.transitionScreen}>
        <p className={styles.transitionText}>Oweek&nbsp;2026</p>
      </div>
    );
  }

  /* ── COUNTDOWN ────────────────────────────────────────────── */
  if (!isUnlocked) {
    return (
      <main className={styles.countdownPage}>
        <div className={styles.countdownBg} />
        <div className={styles.countdownCard}>
                    <h1 className={styles.countdownTitle}>
            scan wktu owik slesai kocak
          </h1>
          <div className={styles.countdownTimerRow}>
            <TimerNumber value={timeLeft.days} label="Hari" />
            <span className={styles.countdownColon}>:</span>
            <TimerNumber value={timeLeft.hours} label="Jam" />
            <span className={styles.countdownColon}>:</span>
            <TimerNumber value={timeLeft.minutes} label="Menit" />
            <span className={styles.countdownColon}>:</span>
            <TimerNumber value={timeLeft.seconds} label="Detik" />
          </div>
          <div className={styles.countdownLine} />
        </div>
      </main>
    );
  }

  /* ── GALLERY ─────────────────────────────────────────────── */
  return (
    <main className={`relative bg-black ${styles.galleryReveal}`}>
      {/* Fixed background carousel */}
      <CarouselBg />

      {/* Fixed gradient overlay */}
      <div className={styles.overlay} />

      {/* Scrollable content layer */}
      <div className={styles.scrollWrapper}>

        {/* ── Section 1: Pesan ────────────────────────────── */}
        <section className={styles.contentSection}>
          <div className={styles.glassCard}>
            <h2 className={styles.sectionHeading}>
              Halooo <strong>8 - Mirage</strong>
            </h2>
            <p className={styles.sectionText} style={{ whiteSpace: 'pre-wrap' }}>
{`Congratsss kalian udah berhasil ngelewatin owik!! Gaterasa udah 2 ato 3 bulan kita deket lewat SLDRC. Banyak hal terjadi mulai dr mungkin kalian kurang deket sm anak kalian, anak anaknya kurang ajar sm susah diatur, loading in kurang lancar, selling day hampir ga balik modal, anak anak banyak tanya, atau ada bbrp yang unik, sampe kt pilah sampah yg padahal ga perlu banyak orang kocak. Ini semua itu proses menantang yang bkl bikin kalian bisa lbh mengenal, membantu, ngadepin menti kalian selama setahun kedepan. Jadi jangan pernah merasa bersalah soalnya itu slh satu proses dr kalian bertumbuh. Jadi mentor itu bisa jadi banyak versi. Ada yang friendly, teges, beneran kayak jadi senior dlll buanyak ws, tinggal tergantung kalian mau jadi mentor yg kyk gmn. Semua versi pasti ada plus minusnya tp ak yakin kalian semua udah jadi mentor yang bener sejauh ini. semangat buat perjalanan kalian yang masih ada 1 taun, mungkin bkl ada bosen soalnya emang ga seseru owik tp jgn sampe kalian lost track sm menti2 kalian. Semoga kalian tetep jadi andalan anak anak kalian wktu mereka lagi susah adaptasi di kuliah. \nThankyouu udah bntu ngisi waktu liburku jd menyenangkan dan ga nganggur di rumah. smoga kt ttp deket wlau psti jrg ktemu. see u ol

-lui anjay keterima apple keren banget wow`}
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
