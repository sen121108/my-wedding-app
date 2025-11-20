import React, { useEffect, useState } from "react";

export default function FloatingChaser() {
  // girl は一定速度で周回
  const [girl, setGirl] = useState({ x: 95, y: 0, phase: 0 });
  // boy は girl より早い
  const [boy, setBoy] = useState({ x: 90, y: 0, phase: 0 });

  const girlSpeed = 0.25;
  const boySpeed = 0.75; // ← girl より速い（調整OK）

  const [hearts, setHearts] = useState([]); // ハートリスト

  // 与えられた（x,y）座標の進行方向から向きを決める
  function directionFromPhase(phase) {
    switch (phase) {
      case 0: return "left";   // 上端を左へ
      case 1: return "down";   // 左端を下へ
      case 2: return "right";  // 下端を右へ
      case 3: return "up";     // 右端を上へ
      default: return "right";
    }
  }

  // 外周を左回りに移動する処理（キャラごとに速度を変える）
  function moveCharacter(prev, speed) {
    let { x, y, phase } = prev;

    switch (phase) {
      case 0: x -= speed; if (x <= 5) { x = 5; phase = 1; } break;
      case 1: y += speed; if (y >= 95) { y = 95; phase = 2; } break;
      case 2: x += speed; if (x >= 95) { x = 95; phase = 3; } break;
      case 3: y -= speed; if (y <= 5) { y = 5; phase = 0; } break;
    }
    return { x, y, phase };
  }

  // boy → girl の距離をチェック
  function checkCatch(b, g) {
    const dx = b.x - g.x;
    const dy = b.y - g.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < 5; // 5(vw/vh)以内に近づいたら捕獲とする
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // ① girl 周回
      setGirl((prev) => moveCharacter(prev, girlSpeed));

      // ② boy 周回
      setBoy((prev) => moveCharacter(prev, boySpeed));

      // ③ boy が追いついたらハート追加
      if (checkCatch(boy, girl)) {
        setHearts((h) => [
          ...h,
          {
            id: Math.random(),
            x: girl.x,
            y: girl.y,
          },
        ]);

        // ハートを3秒後に自然消滅
        setTimeout(() => {
          setHearts((h) => h.slice(1));
        }, 100);
      }
    }, 16); // 約60fps
    return () => clearInterval(interval);
  }, [boy, girl]);

  return (
    <>
      {/* === girl === */}
      <img
        src="/image/icons/girl.png"
        className="fixed w-16 h-16 z-[999] pointer-events-none transition-transform duration-75"
        style={{
          left: `${girl.x}vw`,
          top: `${girl.y}vh`,
          transform:
            directionFromPhase(girl.phase) === "left"
              ? "scaleX(1)"
              : directionFromPhase(girl.phase) === "right"
              ? "scaleX(-1)"
              : directionFromPhase(girl.phase) === "up"
              ? "rotate(90deg)"
              : "rotate(-90deg)",
        }}
      />

      {/* === boy === */}
      <img
        src="/image/icons/boy.png"
        className="fixed w-16 h-16 z-[999] pointer-events-none transition-transform duration-75"
        style={{
          left: `${boy.x}vw`,
          top: `${boy.y}vh`,
          transform:
            directionFromPhase(boy.phase) === "left"
              ? "scaleX(1)"
              : directionFromPhase(boy.phase) === "right"
              ? "scaleX(-1)"
              : directionFromPhase(boy.phase) === "up"
              ? "rotate(90deg)"
              : "rotate(-90deg)",
        }}
      />

      {/* === 捕まえたときのハート === */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed text-pink-500 text-4xl animate-ping z-[999]"
          style={{
            left: `${h.x}vw`,
            top: `${h.y}vh`,
          }}
        >
          💗
        </div>
      ))}
    </>
  );
}
