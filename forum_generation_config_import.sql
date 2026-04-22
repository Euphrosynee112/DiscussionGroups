begin;

insert into forum_topic_tag_catalog (
  owner_id, id, label, description, sort_order, is_enabled, metadata, created_at, updated_at
) values
('default','chart_sales','榜单/销量','榜单、销量、一位、商业成绩',10,true,'{}'::jsonb,now(),now()),
('default','stage_live','舞台/现场','舞台表现、开麦、唱跳、巡演现场',20,true,'{}'::jsonb,now(),now()),
('default','music_work','作品内容','歌曲、专辑、作品内容本身',30,true,'{}'::jsonb,now(),now()),
('default','schedule_travel','行程/赶场','行程、赶场、两国飞、工作安排',40,true,'{}'::jsonb,now(),now()),
('default','health_official','健康/官宣','身体状态、工作室声明、退出活动、复工安排',50,true,'{}'::jsonb,now(),now()),
('default','visual_style','造型/视觉','造型、妆发、穿搭、颜值图',60,true,'{}'::jsonb,now(),now()),
('default','social_update','社媒动态','泡泡、微博、ins、直播发言、公开互动',70,true,'{}'::jsonb,now(),now()),
('default','offline_sighting','线下目击','机场、医院、签售、路透、线下目击',80,true,'{}'::jsonb,now(),now()),
('default','dating_rumor','恋情传闻','恋情爆料、约会传闻、绯闻链路',90,true,'{}'::jsonb,now(),now()),
('default','cp_interaction','CP互动','同框张力、互动糖、舞台嗑点',100,true,'{}'::jsonb,now(),now()),
('default','fandom_dynamics','饭圈风向','站姐、脱粉、控评、粉圈风向、粉丝情绪',110,true,'{}'::jsonb,now(),now()),
('default','public_buzz','公共讨论','热搜、营销号、外网讨论、行业规则、公共舆论',120,true,'{}'::jsonb,now(),now())
on conflict (owner_id, id) do update
set label = excluded.label,
    description = excluded.description,
    sort_order = excluded.sort_order,
    is_enabled = excluded.is_enabled,
    metadata = excluded.metadata,
    updated_at = now();

insert into forum_generation_weight_configs (
  owner_id, id, scope_type, scope_key, config_key, weights_jsonb, metadata, created_at, updated_at
) values
('default','forum_weight_cfg_01','global','default','post_source_weights.hot_present','{"hot_topic":0.55,"latest_discussion":0.35,"history_digest":0.1}'::jsonb,'{}'::jsonb,now(),now()),
('default','forum_weight_cfg_02','global','default','post_source_weights.no_hot','{"hot_topic":0,"latest_discussion":0.8,"history_digest":0.2}'::jsonb,'{}'::jsonb,now(),now()),
('default','forum_weight_cfg_03','global','default','reply_mode_weights.default','{"agree_extend":0.24,"boundary_disagree":0.16,"evidence_add":0.2,"emotion_echo":0.18,"topic_shift":0.12,"meme_light":0.1}'::jsonb,'{}'::jsonb,now(),now()),
('default','forum_weight_cfg_04','global','default','reply_mode_weights.rumor_group','{"agree_extend":0.18,"boundary_disagree":0.24,"evidence_add":0.22,"emotion_echo":0.14,"topic_shift":0.12,"meme_light":0.1}'::jsonb,'{}'::jsonb,now(),now()),
('default','forum_weight_cfg_05','global','default','reply_mode_weights.career_group','{"agree_extend":0.24,"boundary_disagree":0.1,"evidence_add":0.28,"emotion_echo":0.14,"topic_shift":0.18,"meme_light":0.06}'::jsonb,'{}'::jsonb,now(),now()),
('default','forum_weight_cfg_06','global','default','reply_mode_weights.state_group','{"agree_extend":0.2,"boundary_disagree":0.12,"evidence_add":0.22,"emotion_echo":0.22,"topic_shift":0.18,"meme_light":0.06}'::jsonb,'{}'::jsonb,now(),now()),
('default','forum_weight_cfg_07','global','default','knowledge_level_limits','{"surface":{"maxHistoryDigests":0,"maxInterpretationFrames":0,"recentDays":0},"recent":{"maxHistoryDigests":1,"maxInterpretationFrames":0,"recentDays":14},"deep":{"maxHistoryDigests":2,"maxInterpretationFrames":0,"recentDays":3650},"legacy":{"maxHistoryDigests":3,"maxInterpretationFrames":1,"recentDays":3650}}'::jsonb,'{}'::jsonb,now(),now())
on conflict (owner_id, scope_type, scope_key, config_key) do update
set id = excluded.id,
    weights_jsonb = excluded.weights_jsonb,
    metadata = excluded.metadata,
    updated_at = now();

commit;
