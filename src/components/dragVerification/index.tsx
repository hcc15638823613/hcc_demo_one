import { useState, useEffect, useRef, SetStateAction } from 'react';

export default function PicAuthCode(props: {
  setCode: () => SetStateAction<string>;
}) {
  (PicAuthCode as any).defaultProps = {
    setCode: () => '', //更新验证码的方法,返回验证码即可
  };

  const [config] = useState({
    contentWidth: 100,
    contentHeight: 35,
    backgroundColorMin: 180,
    backgroundColorMax: 240,
    fontSizeMin: 25,
    fontSizeMax: 30,
    colorMin: 50,
    colorMax: 160,
    lineColorMin: 40,
    lineColorMax: 180,
    dotColorMin: 0,
    dotColorMax: 255,
    textStyle: {
      fontSize: '12px',
      color: 'gray',
      marginLeft: '6px',
      cursor: 'pointer',
      padding: '5px',
      userSelect: 'none',
    },
  });
  const [identifyCode, setIdentifyCode] = useState('');

  const canvasRef = useRef();

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    identifyCode && drawPic();
  });

  (PicAuthCode as any).defaultProps = {
    setCode: () => '', // 更新验证码的函数
  };

  const drawPic = () => {
    let canvas = canvasRef.current as any;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = randomColor(
      config.backgroundColorMin,
      config.backgroundColorMax,
    );
    ctx.strokeStyle = randomColor(
      config.backgroundColorMin,
      config.backgroundColorMax,
    );
    ctx.fillRect(0, 0, config.contentWidth, config.contentHeight);
    ctx.strokeRect(0, 0, config.contentWidth, config.contentHeight);
    for (let i = 0; i < identifyCode.length; i++) {
      drawText(ctx, identifyCode[i], i);
    }
    drawLine(ctx);
    drawDot(ctx);
  };
  const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const randomColor = (min: number, max: number) => {
    let r = randomNum(min, max);
    let g = randomNum(min, max);
    let b = randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };
  const drawText = (
    ctx: {
      fillStyle: string;
      font: string;
      textBaseline: string;
      translate: (arg0: number, arg1: number) => void;
      rotate: (arg0: number) => void;
      fillText: (arg0: any, arg1: number, arg2: number) => void;
    },
    txt: string,
    i: number,
  ) => {
    ctx.fillStyle = randomColor(config.colorMin, config.colorMax);
    ctx.font = randomNum(config.fontSizeMin, config.fontSizeMax) + 'px SimHei';
    ctx.textBaseline = 'alphabetic';
    let x = (i + 1) * (config.contentWidth / (identifyCode.length + 1));
    let y = randomNum(config.fontSizeMax, config.contentHeight - 12);
    let deg = randomNum(-45, 45);
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  };
  const drawLine = (ctx: {
    strokeStyle: string;
    beginPath: () => void;
    moveTo: (arg0: number, arg1: number) => void;
    lineTo: (arg0: number, arg1: number) => void;
    stroke: () => void;
  }) => {
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = randomColor(config.lineColorMin, config.lineColorMax);
      ctx.beginPath();
      ctx.moveTo(
        randomNum(0, config.contentWidth),
        randomNum(0, config.contentHeight),
      ); //设置起点x,y
      ctx.lineTo(
        randomNum(0, config.contentWidth),
        randomNum(0, config.contentHeight),
      ); //绘制直线 x,y 一条当前位置到x,y点的直线
      ctx.stroke();
    }
  };
  const drawDot = (ctx: {
    fillStyle: string;
    beginPath: () => void;
    arc: (
      arg0: number,
      arg1: number,
      arg2: number,
      arg3: number,
      arg4: number,
    ) => void;
    fill: () => void;
  }) => {
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        randomNum(0, config.contentWidth),
        randomNum(0, config.contentHeight),
        1,
        0,
        2 * Math.PI,
      );
      ctx.fill();
    }
  };
  const refresh = () => {
    const words = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += words[Math.floor(Math.random() * 52)];
    }
    props.setCode ? setIdentifyCode(props.setCode()) : setIdentifyCode(code);
  };

  return (
    <div style={{ margin: '10px' }}>
      <canvas
        ref={canvasRef as any}
        width={config.contentWidth}
        height={config.contentHeight}
      />
      <span style={config.textStyle as any} onClick={refresh}>
        换一张
      </span>
    </div>
  );
}
