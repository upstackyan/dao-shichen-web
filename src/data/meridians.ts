export interface MeridianQuote {
  text: string
  source: string
  gloss: string
}

export interface ShichenData {
  index: number
  /** 地支名，如「子」 */
  name: string
  /** 时辰别称，如「夜半」 */
  alias: string
  /** 起始时间，如 23:00 */
  start: string
  /** 结束时间，如 01:00 */
  end: string
  /** 经络全称，如「足少阳胆经」 */
  meridian: string
  /** 对应脏腑 */
  organ: string
  /** 五行归属 */
  element: string
  /** 传统色名 */
  colorName: string
  /** 主题色（经络高亮 / 强调色） */
  color: string
  /** 渐变深色端 */
  colorDeep: string
  /** 渐变浅色端 */
  colorLight: string
  /** 养生动作提醒 */
  advice: string
  should: string[]
  avoid: string[]
  quotes: MeridianQuote[]
}

export const SHICHEN_LIST: ShichenData[] = [
  {
    index: 0,
    name: '子',
    alias: '夜半',
    start: '23:00',
    end: '01:00',
    meridian: '足少阳胆经',
    organ: '胆',
    element: '木',
    colorName: '玄青',
    color: '#4c5f8f',
    colorDeep: '#232c44',
    colorLight: '#93a3cc',
    advice: '子时胆经当令，阳气初生。此时入睡最能养胆气、助生发，一夜好眠由此始。',
    should: ['尽快入睡', '睡前静心安神', '晚餐清淡七分饱'],
    avoid: ['熬夜', '油腻宵夜', '剧烈运动与情绪激动'],
    quotes: [
      {
        text: '凡十一藏，取决于胆也。',
        source: '《素问·六节藏象论》',
        gloss: '胆主决断，是五脏六腑功能协调运行的关键。',
      },
      {
        text: '阳气尽则卧。',
        source: '《灵枢·口问》',
        gloss: '阳气收敛之时，便应安卧休息。',
      },
    ],
  },
  {
    index: 1,
    name: '丑',
    alias: '鸡鸣',
    start: '01:00',
    end: '03:00',
    meridian: '足厥阴肝经',
    organ: '肝',
    element: '木',
    colorName: '苍青',
    color: '#4d7c6b',
    colorDeep: '#25403a',
    colorLight: '#9cc4b5',
    advice: '丑时肝经当令，熟睡之中肝血归藏、推陈出新，养肝正在无声处。',
    should: ['保持深度睡眠', '睡前疏解情绪'],
    avoid: ['熬夜伤肝', '饮酒', '思虑过重'],
    quotes: [
      {
        text: '人卧，血归于肝。',
        source: '《素问·五脏生成》',
        gloss: '人安卧之时，血液回流肝脏以滋养周身。',
      },
      {
        text: '肝者，将军之官，谋虑出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '肝如将军，主谋略决断，为生机之先锋。',
      },
    ],
  },
  {
    index: 2,
    name: '寅',
    alias: '平旦',
    start: '03:00',
    end: '05:00',
    meridian: '手太阴肺经',
    organ: '肺',
    element: '金',
    colorName: '紫棠',
    color: '#715c94',
    colorDeep: '#392e52',
    colorLight: '#b5a6d3',
    advice: '寅时肺经当令，气血重新分配周身。宜安睡，早醒者可静坐深呼吸，吐故纳新。',
    should: ['安稳睡眠', '醒后缓慢深呼吸', '注意保暖避风寒'],
    avoid: ['骤然起身', '受寒着凉'],
    quotes: [
      {
        text: '肺者，相傅之官，治节出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '肺如宰相，辅佐心君调节全身气血运行。',
      },
      {
        text: '肺朝百脉。',
        source: '《素问·经脉别论》',
        gloss: '百脉之气皆朝会于肺，肺主一身之气。',
      },
    ],
  },
  {
    index: 3,
    name: '卯',
    alias: '日出',
    start: '05:00',
    end: '07:00',
    meridian: '手阳明大肠经',
    organ: '大肠',
    element: '金',
    colorName: '缇金',
    color: '#c9973f',
    colorDeep: '#6b4e1e',
    colorLight: '#efd196',
    advice: '卯时大肠经当令，旭日初升。宜起床饮温水、排浊解毒，以清爽之身迎新的一天。',
    should: ['起床饮一杯温水', '排便排浊', '舒展筋骨、温和晨练'],
    avoid: ['赖床贪睡', '晨起即饮冷饮'],
    quotes: [
      {
        text: '大肠者，传导之官，变化出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '大肠主传导糟粕，泌浊分清，推陈出新。',
      },
      {
        text: '日出而作，日入而息。',
        source: '《击壤歌》',
        gloss: '起居随太阳升降，是古人最朴素的养生之道。',
      },
    ],
  },
  {
    index: 4,
    name: '辰',
    alias: '食时',
    start: '07:00',
    end: '09:00',
    meridian: '足阳明胃经',
    organ: '胃',
    element: '土',
    colorName: '缃叶',
    color: '#b0a13c',
    colorDeep: '#575220',
    colorLight: '#e3da92',
    advice: '辰时胃经当令，阳气旺盛、消化力最强。务必认真吃一顿早餐，为一整天蓄能。',
    should: ['认真吃早餐', '温热饮食', '饭后缓行百步'],
    avoid: ['空腹忙碌', '生冷寒凉', '暴饮暴食'],
    quotes: [
      {
        text: '胃者，仓廪之官，五味出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '胃如粮仓，受纳水谷、化生五味营养。',
      },
      {
        text: '食气入胃，散精于肝，淫气于筋。',
        source: '《素问·经脉别论》',
        gloss: '饮食入胃之后，精微输布于肝，滋养筋脉。',
      },
    ],
  },
  {
    index: 5,
    name: '巳',
    alias: '隅中',
    start: '09:00',
    end: '11:00',
    meridian: '足太阴脾经',
    organ: '脾',
    element: '土',
    colorName: '琥珀',
    color: '#b0763a',
    colorDeep: '#5c3c1e',
    colorLight: '#e0b98d',
    advice: '巳时脾经当令，脾主运化、升清。头脑清明、精力充沛，是工作学习的黄金时段。',
    should: ['专注工作学习', '少量温水助运化', '适时起身活动'],
    avoid: ['久坐不动', '过量饮食', '忧思过度'],
    quotes: [
      {
        text: '脾者，谏议之官，知周出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '脾主思虑周详，如谏议之官洞察全局。',
      },
      {
        text: '脾主身之肌肉。',
        source: '《素问·痿论》',
        gloss: '肌肉四肢的强健，全赖脾的运化滋养。',
      },
    ],
  },
  {
    index: 6,
    name: '午',
    alias: '日中',
    start: '11:00',
    end: '13:00',
    meridian: '手少阴心经',
    organ: '心',
    element: '火',
    colorName: '朱红',
    color: '#c93756',
    colorDeep: '#63192b',
    colorLight: '#eda2b3',
    advice: '午时心经当令，阳极阴生。宜小憩片刻养心神，小睡亦是大补。',
    should: ['午间小憩 15–30 分钟', '午餐七分饱', '静坐养神'],
    avoid: ['高强度用脑', '情绪大起大落', '剧烈运动'],
    quotes: [
      {
        text: '心者，君主之官也，神明出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '心如君主统御周身，精神意识由之而出。',
      },
      {
        text: '阳气者，一日而主外，平旦人气生，日中而阳气隆。',
        source: '《素问·生气通天论》',
        gloss: '人体阳气随日升日降，正午最为旺盛。',
      },
    ],
  },
  {
    index: 7,
    name: '未',
    alias: '日昳',
    start: '13:00',
    end: '15:00',
    meridian: '手太阳小肠经',
    organ: '小肠',
    element: '火',
    colorName: '朱柿',
    color: '#d1603d',
    colorDeep: '#672c1a',
    colorLight: '#f0b098',
    advice: '未时小肠经当令，泌别清浊。让午餐被充分消化吸收，化生气血滋养全身。',
    should: ['午后从容工作', '适量补充水分', '伸展肩颈'],
    avoid: ['饭后立即剧烈活动', '久坐僵卧'],
    quotes: [
      {
        text: '小肠者，受盛之官，化物出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '小肠受纳胃中水谷，分化精微与糟粕。',
      },
    ],
  },
  {
    index: 8,
    name: '申',
    alias: '晡时',
    start: '15:00',
    end: '17:00',
    meridian: '足太阳膀胱经',
    organ: '膀胱',
    element: '水',
    colorName: '青黛',
    color: '#42638c',
    colorDeep: '#1f3247',
    colorLight: '#93aecb',
    advice: '申时膀胱经当令，宜多饮水、利排泄；此时记忆力与理解力俱佳，适合读书学习。',
    should: ['多喝温水', '排尿勿憋', '读书学习、梳理工作'],
    avoid: ['久坐憋尿', '过饮浓茶咖啡'],
    quotes: [
      {
        text: '膀胱者，州都之官，津液藏焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '膀胱如水库，贮藏津液、气化而出。',
      },
    ],
  },
  {
    index: 9,
    name: '酉',
    alias: '日入',
    start: '17:00',
    end: '19:00',
    meridian: '足少阴肾经',
    organ: '肾',
    element: '水',
    colorName: '暮紫',
    color: '#8c5580',
    colorDeep: '#43283e',
    colorLight: '#c9a0bf',
    advice: '酉时肾经当令，日落而归。宜休整身心、清淡晚餐，贮藏一日之精气。',
    should: ['适度休息放松', '清淡晚餐', '按摩腰部、叩齿咽津'],
    avoid: ['过度劳累', '情绪过激', '纵欲耗精'],
    quotes: [
      {
        text: '肾者，作强之官，伎巧出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '肾主精力与技巧，是体力与智慧的根基。',
      },
      {
        text: '肾者主水，受五藏六府之精而藏之。',
        source: '《素问·上古天真论》',
        gloss: '肾主藏精，汇聚五脏六腑的生命精华。',
      },
    ],
  },
  {
    index: 10,
    name: '戌',
    alias: '黄昏',
    start: '19:00',
    end: '21:00',
    meridian: '手厥阴心包经',
    organ: '心包',
    element: '君火',
    colorName: '暮橙',
    color: '#b96a3e',
    colorDeep: '#57311b',
    colorLight: '#e5b193',
    advice: '戌时心包经当令，喜乐出焉。宜愉悦身心，散步谈心，读书听乐，享受团聚时光。',
    should: ['轻缓散步', '与亲友谈心', '读书听乐'],
    avoid: ['剧烈运动', '大喜大怒', '沉迷刺激娱乐'],
    quotes: [
      {
        text: '膻中者，臣使之官，喜乐出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '心包（膻中）护卫心脏，喜乐之情由之而发。',
      },
    ],
  },
  {
    index: 11,
    name: '亥',
    alias: '人定',
    start: '21:00',
    end: '23:00',
    meridian: '手少阳三焦经',
    organ: '三焦',
    element: '相火',
    colorName: '墨蓝',
    color: '#3f5877',
    colorDeep: '#1d2b3c',
    colorLight: '#8fa6c2',
    advice: '亥时三焦经当令，百脉通调。宜温水沐足、安神静卧，为子时入睡做好准备。',
    should: ['温水沐足', '放下手机静心', '亥时末入睡最佳'],
    avoid: ['熬夜', '宵夜', '思虑纷繁'],
    quotes: [
      {
        text: '三焦者，决渎之官，水道出焉。',
        source: '《素问·灵兰秘典论》',
        gloss: '三焦疏通水道，总司全身气化运行。',
      },
      {
        text: '阳气尽，阴气盛，则目瞑。',
        source: '《灵枢·口问》',
        gloss: '阳气敛尽、阴气渐盛，人便合目安眠。',
      },
    ],
  },
]
