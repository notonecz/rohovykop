package web

import (
	"api/ent"
	"api/ent/setting"
	"encoding/base64"
	"github.com/kataras/iris/v12"
	"strings"
)

func GetFile(ctx iris.Context, db *ent.Client, id int) {
	favicon, err := db.Setting.
		Query().
		Where(setting.ID(id)).
		Select(setting.FieldValue).
		Only(ctx)

	if err != nil {
		panic(err)
	}

	base64Data := favicon.Value
	if !strings.HasPrefix(base64Data, "data:image/") {
		panic("Invalid favicon format:" + base64Data)
	}

	commaIndex := strings.Index(base64Data, ",")
	if commaIndex == -1 {
		panic("Malformed Base64 data:" + base64Data)
	}

	mimeType := base64Data[5:commaIndex]
	data := base64Data[commaIndex+1:]

	decodedData, errdecode := base64.StdEncoding.DecodeString(data)
	if errdecode != nil {
		panic(err)
	}

	ctx.ContentType(mimeType[:strings.Index(mimeType, ";")])
	_, err = ctx.Write(decodedData)
	if err != nil {
		panic(err)
	}
}

func GetFavicon(ctx iris.Context, db *ent.Client) {

	GetFile(ctx, db, 3)

}

func GetLogo(ctx iris.Context, db *ent.Client) {

	GetFile(ctx, db, 2)

}

func GetBaner(ctx iris.Context, db *ent.Client) {

	GetFile(ctx, db, 1)

}
