DO
$$

DECLARE postRec RECORD;
DECLARE rec RECORD;
DECLARE recName text;
DECLARE recJsonText text;

BEGIN

for postRec in SELECT id FROM "Post" loop
  -- empty json fields first
  UPDATE "Post" SET "subSubcategoriesOrderJson" = '[]'::jsonb WHERE id = postRec.id;
  UPDATE "Post" SET "tagsOrderJson" = '[]'::jsonb WHERE id = postRec.id;
  UPDATE "Post" SET "relatedPostsOrderJson" = '[]'::jsonb WHERE id = postRec.id;

  -- subSubcategory
  for rec in SELECT "B" FROM "_Post_subSubcategories" WHERE "A"=postRec.id loop
    SELECT "nameForCMS" into recName FROM "SubSubcategory" WHERE id=rec."B";
    recJsonText := format('{"id": "%s", "label": "%s"}', rec."B", recName);
    -- raise notice '% % %', rec."B", recName, recJsonText;
    UPDATE "Post" SET "subSubcategoriesOrderJson" = "subSubcategoriesOrderJson" || recJsonText::jsonb WHERE id = postRec.id;
  end loop;

  -- tag
  for rec in SELECT "B" FROM "_Post_tags" WHERE "A"=postRec.id loop
    SELECT name into recName FROM "Tag" WHERE id=rec."B";
    recJsonText := format('{"id": "%s", "label": "%s"}', rec."B", recName);
    -- raise notice '% % %', rec."B", recName, recJsonText;
    UPDATE "Post" SET "tagsOrderJson" = "tagsOrderJson" || recJsonText::jsonb WHERE id = postRec.id;
  end loop;

  -- related post
  for rec in SELECT "A" FROM "_Post_relatedPosts" WHERE "B"=postRec.id loop
    SELECT title into recName FROM "Post" WHERE id=rec."A";
    recJsonText := format('{"id": "%s", "label": "%s"}', rec."A", recName);
    -- raise notice '% % %', rec."A", recName, recJsonText;
    UPDATE "Post" SET "relatedPostsOrderJson" = "relatedPostsOrderJson" || recJsonText::jsonb WHERE id = postRec.id;
  end loop;
end loop;

END
$$;
