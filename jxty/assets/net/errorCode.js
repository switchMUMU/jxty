

const ErrorCode = {}

function add( error ){
    // assert(errors[error.code] == nil, string.format("had the same error code[%x], msg[%s]", error.code, error.message))
    if (ErrorCode[error.code] != null){
        console.log("had the same error code[%i], msg[%s]", error.code, error.message);
        return
    }
    ErrorCode[error.code] = error.message
    return error.code
}

//系统错误码
ErrorCode.SystemError = {
    success                 :add({code:0x0000, message:"成功"}),
    forward                 :add({code:0x0001, message:"重定向"}),
    unknown                 :add({code:0x0002, message:"未知错误"}),
    timeout                 :add({code:0x0003, message:"请求超时"}),
    serialize               :add({code:0x0004, message:"序列化错误"}),
    argument                :add({code:0x0005, message:"参数错误"}),
    notImplement            :add({code:0x0006, message:"协议未实现"}),
    illegalOperation        :add({code:0x0007, message:"非法操作"}),
    db                      :add({code:0x0008, message:"数据库操作失败"}),
    messageTooLong          :add({code:0x0009, message:"消息包太长"}),
    protoNotExisits         :add({code:0x000a, message:"不存在此协议"}),
    notLogin                :add({code:0x000b, message:"未登录"}),
    serviceIsStoped         :add({code:0x000c, message:"服务故障"}),
    busy                    :add({code:0x000d, message:"服务忙"}),
    logined                 :add({code:0x000e, message:"已登录"}),
    network                 :add({code:0x000f, message:"网络异常"}),
    ServerMaintenance       :add({code:0x0010, message:"服务器维护"}),
    config                  :add({code:0x0011, message:"配置错误"}),
    roleIsSeal              :add({code:0x0012, message:"您的账号已被封,请与客服联系"}),
    loginExpetion           :add({code:0x0013, message:"账号登录受限"}),
    reLoginForbid           :add({code:0x0014, message:"无法断线重连"}),
    recoverError            :add({code:0x0015, message:"无法恢复"}),
}

//游戏公用错误码
ErrorCode.GameError = {
    resourceNotEnough       :add({code:0x00a1, message:"资源不足"}),
    goldNotEnough           :add({code:0x00a2, message:"金币不足"}),
    treasureNotEnough       :add({code:0x00a3, message:"礼品券不足，您可在经典模式捕鱼场获取礼品券！"}),
    luckyBagNotEnough       :add({code:0x00a4, message:"福袋不足"}),
    bagNotEnough            :add({code:0x00a5, message:"背包空间不够"}),
    openHoleResLimit        :add({code:0x00a6, message:"打孔材料不足"}),
    petGemNotEnough         :add({code:0x00a7, message:"宠物晶石不够"}),
    starCoreNotEnough       :add({code:0x00a8, message:"星核不够"}),
    petCoinNotEnough        :add({code:0x00a9, message:"宠物币不够"}),
    upmaterialNotEnough     :add({code:0x00aa, message:"强化材料不够"}),
    resourceNotExist        :add({code:0x00ab, message:"资源不存在"}),
    unionResNotEnough       :add({code:0x00ac, message:"公会资源不够"}),
    goodsNotEnough          :add({code:0x00ad, message:"道具数量不足"}),
    goodsNotExist           :add({code:0x00ae, message:"道具不存在"}),
    roleLevelNotEnough      :add({code:0x00af, message:"角色等级不足"}),
    fightPointNotEnough     :add({code:0x00b0, message:"战力不足"}),
}


//认证
ErrorCode.AuthError = {
    tokenIsInvalid          :add({code:0x0101, message:"token不合法"}),
    tokenIsTimeout          :add({code:0x0102, message:"token已经过期"}),
    nicknameIsInvalid       :add({code:0x0103, message:"昵称含有非法字符"}),
    nicknameIsExists        :add({code:0x0104, message:"昵称已经存在"}),
    hasRole                 :add({code:0x0105, message:"该账户已经存在角色"}),
    banAccount              :add({code:0x0106, message:"该账号已被暂停服务"}),
    imeiIsInvalid           :add({code:0x0107, message:"异常的设备号"}),
    nicknameLength          :add({code:0x0108, message:"昵称长度不符"}),
}

//捕鱼
ErrorCode.CatchFishError = {
    noHaveGunType           :add({code:0x0201, message:"你还没有该炮塔类型"}),
    passwordWrong           :add({code:0x0202, message:"密码错误"}),
    gunLevelTooLow          :add({code:0x0203, message:"炮倍等级不够"}),
    roomNotFound            :add({code:0x0204, message:"房间不存在"}),
    fireCding               :add({code:0x0205, message:"发炮太频繁"}),
    roomIsFull              :add({code:0x0206, message:"房间已满"}),
    lessThenMinGunLevel     :add({code:0x0207, message:"不能低于房间最低炮倍"}),
    joined                  :add({code:0x0208, message:"你已经报名了当前竞技比赛"}),
    notEnoughMoney          :add({code:0x0209, message:"您不满足参赛条件"}),
    bulletNotEnough         :add({code:0x020a, message:"子弹不足"}),
    notStart                :add({code:0x020b, message:"竞技比赛还未开始,请等待其他玩家"}),
    isInArena               :add({code:0x020c, message:"已经在竞技比赛中"}),
    arenaIsOver             :add({code:0x020d, message:"竞技比赛已经结束"}),
    gunLevelUnlock          :add({code:0x020f, message:"炮倍未解锁"}),
    energyNotFull           :add({code:0x0210, message:"怒气还未满"}),
    invalidSliceRate        :add({code:0x0211, message:"别着急慢慢来", describe:"异常的切鱼频率"}),
    invalidGunLevel         :add({code:0x0212, message:"炮倍等级异常"}),
    goldNotEnough           :add({code:0x0213, message:"金币不足"}),
    openAwardTm             :add({code:0x0214, message:"奖励结算中"}),
    boxNotFound             :add({code:0x0215, message:"不存在此宝箱"}),
    matchWillClose          :add({code:0x0216, message:"赛事即将结束，请期待下一期"}),
}

// 角色模块错误码
ErrorCode.RoleError = {
    cantChangName           :add({code:0x0301, message:"你已经创建过昵称了"}),
    freeGoldNumMax          :add({code:0x0302, message:"今天领取上限"}),
    freeGoldZero            :add({code:0x0303, message:"金币数量超标"}),
    freeGoldTimeLeft        :add({code:0x0304, message:"未到领取时间"}),
    mobileNotLock           :add({code:0x0305, message:"请先绑定手机号码"}),
    noGoldEnergy            :add({code:0x0306, message:"未获得黄金炮"}),
    goldEnergyTooLow        :add({code:0x0307, message:"能量不足，无法兑换"}),
    noChangeBag             :add({code:0x0308, message:"请先换包再领取"}),
    sendCodeTooFrequently   :add({code:0x0309, message:"获取验证码过于频繁"}),
    forbidLogin             :add({code:0x030a, message:"您的账号存在异常，请联系客服"}),
}

// 转盘
ErrorCode.DiskError = {
    canRoll                 :add({code:0x0401, message:"不能参加转盘"}),
}

//聊天
ErrorCode.ChatError = {
    contentIsInvalid        :add({code:0x0601, message:"聊天消息含有非法字符"}),
    speakTooOfen            :add({code:0x0602, message:"聊天消息发送过快"}),
    forbidSpeak             :add({code:0x0603, message:"已被禁言"}),
    targetOffline           :add({code:0x0604, message:"对方已下线"}),
    channelNotExist         :add({code:0x0605, message:"频道号不存在"}),
}

// 宝箱
ErrorCode.BoxError = {
    noOpenNum               :add({code:0x0701, message:"无开启次数"}),
}

//夺宝
ErrorCode.FundError = {
    serverError             :add({code:0x0901, message:"活动维护中"}),
    itemClose               :add({code:0x0902, message:"商品已下架"}),
    itemSoldOut             :add({code:0x0903, message:"商品尾数变动，请重新购买"}),
    roundClose              :add({code:0x0904, message:"商品当前期数已结束，请刷新"}),
    addressEmpty            :add({code:0x0905, message:"请先完善收货地址信息"}),
    addressError            :add({code:0x0906, message:"请填写正确的收货地址"}),
    gunExist                :add({code:0x0907, message:"已经拥有此炮塔"}),
}

// 礼包码兑换
ErrorCode.MiscError  = {
    miscCodeEmpty           :add({code:0x0a01, message:"礼包码不能为空"}),
    miscCodeNotExist        :add({code:0x0a02, message:"请输入正确的兑换码"}),
    miscCodeHadGet          :add({code:0x0a03, message:"兑换码已被使用"}),
    miscTypeNotExist        :add({code:0x0a04, message:"此类型兑换码不存在"}),
    notInUseTime            :add({code:0x0a05, message:"此兑换码不在使用期间内"}),
    useTheSameTypeMisccode  :add({code:0x0a06, message:"你已经领取过该类型礼包"}),
    invalidMiscInfo         :add({code:0x0a07, message:"异常的兑换信息"}),
    canNotReceive           :add({code:0x0a08, message:"还不能领取奖励"}),
}

// 活动
ErrorCode.ActivityError = {
    diskNoNum               :add({code:0x0b01, message:"充值金额不足"}),
    canNotGet               :add({code:0x0b02, message:"信息过期，请重新刷新界面"}),
    noRollNum               :add({code:0x0b03, message:"转盘次数不够"}),
    diskNotOpen             :add({code:0x0b04, message:"活动未开启"}),
    notOpen                 :add({code:0x0b05, message:"活动暂未开放"}),
}

// 充值错误
ErrorCode.ChargeError = {
    shopIndexError          :add({code:0x0c01, message:"充值物品不存在"}),
}

// 手机绑定
ErrorCode.MobileError = {
    hadExist                :add({code:0x0d01, message:"该号码已被绑定"}),
    httpError               :add({code:0x0d02, message:"暂停绑定功能"}),
    notMatch                :add({code:0x0d03, message:"验证码错误"}),
    setNewPwdErr            :add({code:0x0d04, message:"绑定手机成功，修改密码失败"}),
    wrongNumErr             :add({code:0x0d05, message:"手机格式错误"}),
}

// 排行榜错误
ErrorCode.RankError = {
    hadGet                  :add({code:0x1101, message:"已经领取奖励"}),
    canNotGet               :add({code:0x1102, message:"不能领取奖励"}),
}

// 邮件
ErrorCode.MailError = {
    invalidMail             :add({code:0x1201, message:"请求的邮件信息不存在"}),
    invalidAttach           :add({code:0x1202, message:"没有可以领取的附件"}),
}

// 在线奖励
ErrorCode.OnlineError = {
    cannotGet               :add({code:0x1301, message:"不满足领取条件"}),
    hasGot                  :add({code:0x1302, message:"该奖励已经领取"}),
}

// 每日任务
ErrorCode.TaskError = {
    canNotGet               :add({code:0x1401, message:"未达到领取条件"}),
    hadGet                  :add({code:0x1402, message:"已经领取奖励"}),
}

// 奖池
ErrorCode.PotError = {
    timeError               :add({code:0x1601, message:"竞猜时间为21:30分至次日20:50分"}),
    codeError               :add({code:0x1602, message:"竞猜号码格式错误"}),
}

// 七天登录
ErrorCode.SevenDayError = {
    notOpen                 :add({code:0x1701, message:"登录天数未满足"}),
    canNotGet               :add({code:0x1702, message:"不能领取"}),
}

//签到抽奖
ErrorCode.SignDiskError = {
    hadDrawToday            :add({code:0x1801, message:"今天已经抽奖"}),
    awardCanNotGet          :add({code:0x1802, message:"未达到领取天数"}),
    awardHadGet             :add({code:0x1803, message:"奖励已领取"}),
}

//许愿池
ErrorCode.WishPoolError = {
    overLeftNum             :add({code:0x1901, message:"剩余奖品不足10次"}),
}

//聚宝盆
ErrorCode.TreasureBowlError = {
    notLeftTimes            :add({code:0x1b01, message:"没有剩余次数"}),
}

//聚宝盆
ErrorCode.CouponError = {
    notLeftTimes            :add({code:0x1c01, message:"没有剩余次数"}),
    isOpen                  :add({code:0x1c02, message:"此卡已经刮开"}),
    cannotGet               :add({code:0x1c03, message:"未达到领取条件"}),
    hadGot                  :add({code:0x1c04, message:"该奖励已经领取"}),
}

//祈福
ErrorCode.BlessError = {
    luckyValueNotFull       :add({code:0x1d01, message:"幸运值未满"}),
}

//祈福
ErrorCode.CrazyBoxError = {
    notLeftTimes            :add({code:0x1f01, message:"没有剩余次数"}),
    isOpen                  :add({code:0x1f02, message:"此宝箱已开启"}),
}

//每日充值
ErrorCode.DailyChargeError = {
    chargeDaysNotEnough     :add({code:0x2001, message:"充值天数不足"}),
}

//好友邀请
ErrorCode.InviteError = {
    notInActivityTime       :add({code:0x2101, message:"活动时间内创建角色才可领取"}),
    inviteIdNotExist        :add({code:0x2102, message:"请输入正确的邀请人ID"}),
    hadGot                  :add({code:0x2103, message:"该奖励已经领取"}),
    inviteNotEnough         :add({code:0x2104, message:"邀请人数不足"}),
    canNotGet               :add({code:0x2105, message:"无奖励可领取"}),
}

//积分抽奖
ErrorCode.ScoreLotteryError = {
    scoreNotEnough          :add({code:0x2201, message:"积分不足"}),
}

//摇钱树
ErrorCode.MoneyTreeError = {
    leftNumNotEnough            :add({code:0x2301, message:"剩余奖品不足10份"}),
}

//龙宫宝藏
ErrorCode.TreasurePalaceError = {
    openTimesNotEnough          :add({code:0x2401, message:"开启次数不足"}),
}

ErrorCode.EggError = {
    notLeftTimes            :add({code:0x2501, message:"没有剩余次数"}),
    isOpen                  :add({code:0x2502, message:"此金蛋已砸开"}),
}

ErrorCode.GoldGunError = {
    prizeNotEnough              :add({code:0x2601, message:"彩金不足"}),
}

ErrorCode.QBSignError = {
    notFindConfig               :add({code:0x2701, message:"找不到配置"}),
    canNotReceive               :add({code:0x2702, message:"领取条件不足"}),
}

ErrorCode.MorrowGiftError = {
    giftIsReceived              :add({code:0x2801, message:"已经领取过奖励了"}),
    invalidReceivedTime         :add({code:0x2802, message:"领取时间还未到"}),
}

//背包
ErrorCode.BackPackError = {
    serverError             :add({code:0x2901, message:"活动维护中"}),
    hasNoItem               :add({code:0x2902, message:"找不到对应物品"}),
    hasNoSplite             :add({code:0x2903, message:"该商品不可拆分"}),
    unboundMolie            :add({code:0x2904, message:"赠送人未绑定手机号"}),
    lastMolie               :add({code:0x2905, message:"ID与手机尾号不匹配"}),
    notSendSelf             :add({code:0x2906, message:"不能赠送自己"}),
    notThisItem             :add({code:0x2907, message:"商品不存在"}),
    hasPickItem             :add({code:0x2908, message:"已经提货完成"}),
    notGiveToNormal         :add({code:0x2909, message:"不允许赠送给非VIP玩家"}),
    notNormalDo             :add({code:0x2910, message:"非VIP玩家不可以操作"}),
}

module.exports = ErrorCode;