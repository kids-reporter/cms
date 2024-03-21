DO
$$

DECLARE tagRec RECORD;
DECLARE descText text;

BEGIN

for tagRec in SELECT id, name FROM "Tag" loop
  descText := format('常用關鍵字「%s」集合頁匯集與「%s」相關的文章，幫助你從網站豐富的資訊中鎖定自己感興趣的主題，滿足你的好奇心，讓你能深入探索更多特定知識領域。', tagRec.name, tagRec.name);
  -- RAISE NOTICE '%', descText;
  UPDATE "Tag" SET "ogDescription" = descText WHERE id = tagRec.id;
end loop;

END
$$;
