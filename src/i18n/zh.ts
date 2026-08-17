import type { Dict } from './types';

/**
 * Simplified Chinese copy (zh-Hans-MY), using Malaysian Chinese conventions:
 * 服务式公寓 for serviced apartment, 组屋/公寓 usage per local press, and the
 * local transliterations 万宜 (Bangi), 加影 (Kajang), 雪兰莪 (Selangor).
 * Please have a native speaker proofread before launch.
 */
export const zh: Dict = {
  meta: {
    title: 'Vista Bangi 服务式公寓 — 雪兰莪加影 Jalan Reko',
    description:
      'Vista Bangi 服务式公寓官方网站：位于雪兰莪加影 Jalan Reko，两栋 38 层住宅楼，楼下设有两层商铺，配套设施齐全，24 小时保安巡逻及闭路电视监控，并提供短租与 Airbnb 房源。',
    ogAlt: 'Vista Bangi 服务式公寓，雪兰莪加影 Jalan Reko',
  },
  nav: {
    home: '首页',
    outlets: '商铺',
    units: '住宅单位',
    facilities: '设施',
    security: '保安',
    location: '位置',
    stay: '短租',
    contact: '联系',
    menu: '菜单',
    closeMenu: '关闭菜单',
    language: '语言',
    skipToContent: '跳至主要内容',
  },
  hero: {
    eyebrow: 'Jalan Reko · 万宜新镇 · 雪兰莪',
    title: 'Vista Bangi 服务式公寓',
    subtitle:
      '永久地权服务式住宅，由两栋 38 层大楼组成，楼下自设两层商铺 —— 24 小时保安驻守，全区闭路电视监控，并提供短租单位。',
    ctaPrimary: '在地图上查看',
    ctaSecondary: '浏览商铺',
    statFloors: '每栋楼层数',
    statBlocks: '住宅楼栋',
    statRetail: '商业楼层',
    statTenure: '地权',
    logoAlt: 'Vista Bangi 徽标',
    photoAlt: 'Jalan Reko 上 Vista Bangi 两栋大楼与楼下商铺',
  },
  highlights: {
    title: '为什么选择 Vista Bangi',
    intro: '日常所需就在楼下，通勤火车站步行可达，中间还有一道受管制的保安大堂。',
    items: [
      {
        title: '商铺就在楼下',
        body: '第 1 层与第 2 层为商业楼层 —— 杂货、咖啡馆、诊所、牙科与幼儿园，搭一趟电梯即到，无需开车。',
      },
      {
        title: '距 UKM 通勤站 500 米',
        body: '步行即可抵达 KTM 通勤火车站，无需上高速公路即可直达加影、吉隆坡中央车站与森美兰芙蓉。',
      },
      {
        title: '日夜保安驻守',
        body: '单一管制出入口，保安 24 小时值班，公共区域、大堂与停车场全面装设闭路电视。',
      },
      {
        title: '同样适合短租',
        body: '备有家具的单位以 Airbnb 及短租形式出租，访客登记由保安亭统一处理。',
      },
    ],
  },
  outlets: {
    title: '商业店铺',
    intro:
      '咖啡馆、诊所、牙科、幼儿园、杂货与电脑服务，进驻住宅楼下的两层商业楼层。可按类别筛选。',
    levelsCaption: '第 1 与第 2 层',
    filterAll: '全部',
    filterLabel: '按类别筛选',
    unitLabel: '单位',
    levelLabel: (n) => `第 ${n} 层`,
    hoursLabel: '营业时间',
    callLabel: '致电',
    websiteLabel: '网站',
    mapLabel: 'Google 商家',
    logoAlt: (name) => `${name} 标志`,
    verifiedCount: (verified, total) => `${total} 家中已确认 ${verified} 家`,
    toBeConfirmed: '待确认',
    placeholderNotice:
      '单位编号仍在整理中。标注「待确认」的商家确实在此营业，但其单位编号或准确店名仍在向管理处核实。',
    emptyFiltered: '没有此类别的店铺。',
    categories: {
      fnb: '餐饮',
      grocery: '杂货',
      health: '诊所',
      dental: '牙科',
      education: '幼教',
      tech: '电脑与电子',
      services: '服务',
      retail: '零售',
      beauty: '美容养生',
      laundry: '洗衣',
    },
  },
  units: {
    title: '住宅单位',
    intro: 'A 座与 B 座提供开放式至三房格局。',
    studio: '开放式单位',
    bedrooms: (n) => `${n} 房`,
    bathrooms: (n) => `${n} 卫浴`,
    sqft: (min, max) => `${min}–${max} 平方尺`,
    blockTitle: '双塔设计：A 座与 B 座',
    blockBody: '两栋大楼均在共用商铺楼层与设施层之上高达 38 层，各自设有独立电梯与大堂。',
    floorsLabel: '楼层',
    unitsLabel: '单位数',
    unitsTbc: '待确认',
  },
  facilities: {
    title: '设施',
    intro: '两栋大楼共用的完整设施层。',
    labels: {
      swimmingPool: '游泳池',
      kidsPool: '儿童池',
      gym: '健身房',
      multipurposeHall: '多用途礼堂',
      joggingTrack: '跑道',
      playground: '儿童游乐场',
      yogaZone: '瑜伽区',
      sunDeck: '日光浴平台',
      library: '图书室',
      nursery: '托儿所',
      pingPong: '乒乓球室',
      parking: '有盖停车位',
      lifts: '客用电梯',
      surauNearby: '祈祷室',
    },
  },
  security: {
    title: '保安',
    intro: '全天候驻守与监控。',
    guarded: {
      title: '24 小时保安',
      body: '保安人员全天候在保安亭值班，并在园区与停车场范围内巡逻。',
    },
    cctv: {
      title: '闭路电视监控',
      body: '摄像头覆盖出入口、大堂、电梯厅、设施层与各停车楼层，并持续录像。',
    },
    access: {
      title: '出入管制',
      body: '大堂与电梯采用门卡管制，只有住户与已登记的访客才能抵达住宅楼层。',
    },
    visitor: {
      title: '访客登记',
      body: '访客与短租客人入场时须在保安亭登记 —— 方便房东，也让邻居安心。',
    },
  },
  location: {
    title: '位置',
    intro: '坐落 Jalan Reko，介于万宜新镇与加影之间。',
    addressLabel: '地址',
    directions: '获取路线',
    openInMaps: '在 Google 地图中打开',
    copyAddress: '复制地址',
    copied: '已复制',
    mapTitle: '显示 Vista Bangi 服务式公寓位置的地图',
    nearbyTitle: '邻近地点',
    highwaysTitle: '高速公路',
    km: (n) => (n < 1 ? `${Math.round(n * 1000)} 米` : `${n} 公里`),
    pinNotice: '本地图按名称定位该建筑。精确坐标仍在勘测中，确认后将在此更新。',
  },
  stay: {
    title: '短租与 Airbnb',
    intro:
      '两栋大楼均有备家具的单位按日及短期出租，适合探访家庭、UKM 访客，以及在附近工作的承包商。',
    points: [
      '备有家具的开放式与家庭式单位，可按日出租',
      '受管制出入口，访客于保安亭登记',
      '第 1、2 层设有咖啡馆、诊所与杂货 —— 无需开车',
      '步行 500 米即达 UKM KTM 通勤站',
      '距加影 MRT 站 11 分钟 —— T464 号 MRT 接驳巴士全程环线运行，往返直连 Vista Bangi 与加影 MRT 一带',
      '住客可使用泳池、健身房与设施层',
    ],
    cta: '查看短租房源',
    ctaNote: '房源链接由各房东及经营者自行发布。',
  },
  contact: {
    title: '联系我们',
    intro: '管理、维修与租赁事宜请联系。',
    phone: '电话',
    email: '电子邮件',
    whatsapp: 'WhatsApp',
    hours: '办公时间',
    tbc: '即将公布',
  },
  footer: {
    tagline: '服务式公寓 · 雪兰莪加影 Jalan Reko',
    rights: (year) => `© ${year} Vista Bangi 服务式公寓。版权所有。`,
    sections: '网站栏目',
    disclaimer:
      '建筑资料本着诚信发布，日后可能更新。个别短租房源由房东独立经营，与大楼管理层无关。',
    sponsoredBy: '赞助单位',
  },
};
