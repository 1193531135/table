module.exports = {
    danceMovementsRender: [
        { label: "dance_move_name", prop: "danceMoveName", type: "text" },
        {
          label: "dance_move_genre",
          prop: "danceMoveGenre",
          type: "selects",
          option: ["latin", "k-pop", "hip-pop","cardio"],
        },
        {
          label: "dance_move_dancer",
          prop: "danceMoveDancer",
          type: "select",
          option: ["Alex", "Tanarka"],
        },
        {
          label: "dance_move_difficulty",
          prop: "danceMoveDifficulty",
          type: "selects",
          option: ["level-1", "level-2"],
        },
        {
          label: "dance_moves_intensity",
          prop: "danceMovesIntensity",
          type: "select",
          option: ["level-1", "level-2","level-3","level-4"],
        },
        { label: "video_clip", prop: "videoClip", type: "video" },
        { label: "video_time", prop: "videoTime", type: "none" },
        { label: "name_sound", prop: "danceMoveNameRead", type: "media" },
        {
          label: "move_categories",
          prop: "moveCategories",
          type: "selects",
          option: ["dance_moves", "power_moves", ],
        },
        {
          label: "dance_move_categories",
          prop: "danceMoveCategories",
          type: "select",
          option: ["filler", "warmup","starter", "ending", "rest",],
        },
      ],
    musicRender:[
        { label: "music_name", prop: "musicName", type: "text" },
        {
            label: "genre",
            prop: "genre",
            type: "selects",
            option: ["latin", "k-pop", "hip-pop","cardio"],
        },
        { label: "track", prop: "track", type: "audio" },
        { label: "hype_time", prop: "hypeTime", type: "time" },
        { label: "music_length", prop: "musicLength", type:'none' },
    ],
    sharedVoiceClips:[
        { label: "voice_script", prop: "voiceScript", type: "text" },
        { label: "voice_clip", prop: "voiceClip", type: "media" },
    ]
}