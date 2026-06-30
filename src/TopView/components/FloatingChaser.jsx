import React, { useEffect, useRef, useState } from "react";

export default function FloatingChaser() {
  const EDGE_INSET = 3;

  const [girl, setGirl] = useState({ x: 95, y: EDGE_INSET, phase: 0 });
  const [boy, setBoy] = useState({ x: 90, y: EDGE_INSET, phase: 0 });

  const girlRef = useRef(girl);
  const boyRef = useRef(boy);

  const girlSpeed = 0.3;
  const boySpeed = 0.8;

  const [hearts, setHearts] = useState([]);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const [bigHeartPos, setBigHeartPos] = useState({ x: 50, y: 50 });

  const heartCooldown = useRef(false);
  const heartIdRef = useRef(0);

  function transformFor(phase) {
    switch (phase) {
      case 0:
        return "translate(-50%, 0)";
      case 1:
        return "translate(-100%, -50%)";
      case 2:
        return "translate(-50%, -100%)";
      case 3:
        return "translate(0, -50%)";
      default:
        return "translate(-50%, -50%)";
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function moveCharacter(prev, speed) {
    let { x, y, phase } = prev;

    const minPos = EDGE_INSET;
    const maxPos = 100 - EDGE_INSET;

    switch (phase) {
      case 0:
        x = clamp(x + speed, minPos, maxPos);
        if (x >= maxPos) {
          x = maxPos;
          phase = 1;
        }
        break;

      case 1:
        y = clamp(y + speed, minPos, maxPos);
        if (y >= maxPos) {
          y = maxPos;
          phase = 2;
        }
        break;

      case 2:
        x = clamp(x - speed, minPos, maxPos);
        if (x <= minPos) {
          x = minPos;
          phase = 3;
        }
        break;

      case 3:
        y = clamp(y - speed, minPos, maxPos);
        if (y <= minPos) {
          y = minPos;
          phase = 0;
        }
        break;

      default:
        break;
    }

    return { x, y, phase };
  }

  function facingFor(phase) {
    if (phase === 0) return "normal";
    if (phase === 2) return "flip";
    if (phase === 1) return "down";
    return "up";
  }

  function buildTransform(phase) {
    return transformFor(phase);
  }

  function createHeartBurst(x, y) {
    const icons = [
      "❤️",
      "💕",
      "💖",
      "💗",
      "💝",
      "✨",
      "💫",
      "🌸",
      "🎉",
      "🎊",
    ];

    const burst = Array.from({ length: 36 }, (_, i) => ({
      id: heartIdRef.current++,
      x,
      y,
      icon: icons[Math.floor(Math.random() * icons.length)],
      angle: (Math.PI * 2 * i) / 36,
      distance: 80 + Math.random() * 160,
      size: 18 + Math.random() * 26,
      exploded: false,
    }));

    setHearts(burst);

    setBigHeartPos({ x, y });
    setShowBigHeart(true);

    setTimeout(() => {
      setShowBigHeart(false);
    }, 1000);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHearts((prev) =>
          prev.map((heart) => ({
            ...heart,
            exploded: true,
          }))
        );
      });
    });

    setTimeout(() => {
      setHearts([]);
    }, 2000);
  }

  useEffect(() => {
    girlRef.current = girl;
    boyRef.current = boy;
  }, [girl, boy]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextGirl = moveCharacter(girlRef.current, girlSpeed);
      const nextBoy = moveCharacter(boyRef.current, boySpeed);

      const dx = nextGirl.x - nextBoy.x;
      const dy = nextGirl.y - nextBoy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 3 && !heartCooldown.current) {
        heartCooldown.current = true;

        createHeartBurst(
          (nextGirl.x + nextBoy.x) / 2,
          (nextGirl.y + nextBoy.y) / 2
        );

        setTimeout(() => {
          heartCooldown.current = false;
        }, 3000);
      }

      girlRef.current = nextGirl;
      boyRef.current = nextBoy;

      setGirl(nextGirl);
      setBoy(nextBoy);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* girl */}
      <img
        src="/image/icons/girl.png"
        className="fixed w-16 h-16 z-[999] pointer-events-none transition-transform duration-75"
        style={{
          left: `${girl.x}%`,
          top: `${girl.y}%`,
          transform: `${buildTransform(girl.phase)} ${
            facingFor(girl.phase) === "flip"
              ? "scaleX(1)"
              : facingFor(girl.phase) === "down"
              ? "rotate(-90deg)"
              : facingFor(girl.phase) === "up"
              ? "rotate(90deg)"
              : "scaleX(-1)"
          }`,
        }}
      />

      {/* boy */}
      <img
        src="/image/icons/boy.png"
        className="fixed w-16 h-16 z-[999] pointer-events-none transition-transform duration-75"
        style={{
          left: `${boy.x}%`,
          top: `${boy.y}%`,
          transform: `${buildTransform(boy.phase)} ${
            facingFor(boy.phase) === "flip"
              ? "scaleX(1)"
              : facingFor(boy.phase) === "down"
              ? "rotate(-90deg)"
              : facingFor(boy.phase) === "up"
              ? "rotate(90deg)"
              : "scaleX(-1)"
          }`,
        }}
      />

      {/* 中央ハート */}
      {showBigHeart && (
        <div
          className="
            fixed
            z-[1002]
            pointer-events-none
            -translate-x-1/2
            -translate-y-1/2
            animate-pulse
            text-8xl
          "
          style={{
            left: `${bigHeartPos.x}%`,
            top: `${bigHeartPos.y}%`,
          }}
        >
          💞
        </div>
      )}

      {/* 花火 */}
      {hearts.map((heart) => {
        const moveX = Math.cos(heart.angle) * heart.distance;
        const moveY = Math.sin(heart.angle) * heart.distance;

        return (
          <div
            key={heart.id}
            className="
              fixed
              z-[1001]
              pointer-events-none
              select-none
              transition-all
              duration-[2000ms]
              ease-out
            "
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.exploded ? 0 : 1,
              transform: heart.exploded
                ? `translate(${moveX}px, ${moveY}px)
                   rotate(${heart.distance * 4}deg)
                   scale(0.4)`
                : "translate(0px,0px) scale(1)",
            }}
          >
            {heart.icon}
          </div>
        );
      })}
    </>
  );
}
