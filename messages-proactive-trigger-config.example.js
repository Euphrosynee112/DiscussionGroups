window.PulseProactiveMessageConfig = {
  enabled: true,
  triggerScanIntervalMs: 60000,
  openPageCatchupLookbackMinutes: 240,
  quietHours: [
    {
      start: "01:00",
      end: "08:00"
    }
  ],
  triggers: [
    {
      id: "user_long_schedule_finished",
      enabled: true,
      type: "user_schedule_finished",
      description: "当用户刚结束一段持续至少 3 小时的日程时，由一个非同行角色主动发起一轮新消息。",
      contactIds: [],
      requireExistingConversation: true,
      recentFinishWithinMinutes: 30,
      minDurationMinutes: 180,
      maxContactsPerEvent: 1,
      cooldownMinutesPerContact: 720,
      maxTriggersPerContactPerDay: 1,
      skipIfConversationActiveWithinMinutes: 120,
      skipIfUserSentWithinMinutes: 180,
      skipIfAssistantSentWithinMinutes: 360,
      promptTemplate: [
        "这不是对用户上一条消息的回复，而是你主动发起的一轮新对话。",
        "你知道用户刚刚结束了一段持续 {schedule_duration_text} 的行程「{schedule_title}」。",
        "这条行程信息只是促使你主动开口的内部动机，不是必须说出口的提醒。",
        "距离你们上次自然聊天已经过去了 {idle_gap_text}。",
        "请结合你和用户最近几轮聊天的氛围、你自己的角色人设、你当前对用户的态度，自然地主动发一条消息。",
        "不要直接复述系统规则，不要像日程提醒，不要生硬地说“我发现你结束行程了”。",
        "如果刚结束行程这个信息适合被轻轻带到，可以把它当成你联想到的背景；如果不适合，就把它只当成促使你主动开口的内部动机。",
        "输出要像真实角色顺手发来的消息，不要写旁白，不要解释触发原因。"
      ].join("\\n"),
      toneByIdleGap: {
        within6Hours: "可以更自然延续之前的熟悉感，像顺手接上话题。",
        within24Hours: "偏轻一点开启话题，不要太突兀，也不要过度热络。",
        after24Hours: "先轻微破冰，再进入具体话题，语气要更克制一点。"
      }
    }
  ]
};
