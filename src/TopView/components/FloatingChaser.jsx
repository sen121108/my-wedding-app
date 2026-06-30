import React, { useEffect, useState, useRef } from "react";

export default function FloatingChaser() {
  // 座標はパーセンテージで扱う（0〜100）
  const EDGE_INSET = 5;

  const [girl, setGirl] = useState({ x: 95, y: EDGE_INSET, phase: 0 });
  const [boy, setBoy] = useState({ x: 90, y: EDGE_INSET, phase: 0 });

  const girlRef = useRef(girl);
  const boyRef = useRef(boy);

  const girlSpeed = 0.20;
  const boySpeed = 0.70;

  // フェーズごとの向きや transform を決める
  function transformFor(phase, facing) {
    // facing: 'normal' or 'flip' or rotation
    switch (phase) {
      case 0: // top edge, moving right
        return "translate(-50%, 0)"; // 上辺に沿わせる
      case 1: // right edge, moving down
        return "translate(-100%, -50%)"; // 右端に沿わせる
      case 2: // bottom edge, moving left
        return "translate(-50%, -100%)"; // 下辺に沿わせる
      case 3: // left edge, moving up
        return "translate(0, -50%)"; // 左端に沿わせる
      default:
        return "translate(-50%,-50%)";
    }
  }

  // 周回移動（clockwise）: 0 top (x inc 0->100), 1 right (y inc 0->100), 2 bottom (x dec 100->0), 3 left (y dec 100->0)
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

  useEffect(() => {
    girlRef.current = girl;
    boyRef.current = boy;
  }, [girl, boy]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextGirl = moveCharacter(girlRef.current, girlSpeed);
      const nextBoy = moveCharacter(boyRef.current, boySpeed);

      girlRef.current = nextGirl;
      boyRef.current = nextBoy;

      setGirl(nextGirl);
      setBoy(nextBoy);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // 向き（flip/rotation）はフェーズと進行方向で決定
  function facingFor(phase, movingForward = true) {
    // For top (0) and bottom (2), flip horizontally when moving left
    if (phase === 0) return "normal"; // moving right
    if (phase === 2) return "flip"; // moving left
    if (phase === 1) return "down"; // moving down
    return "up"; // phase 3 moving up
  }

  function buildTransform(phase) {
    const base = transformFor(phase);
    return base; // rotation/flip handled via additional CSS (scaleX/rotate) below
  }

  return (
    <>
      {/* === girl === */}
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

      {/* === boy === */}
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
    </>
  );
}
