package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Setting holds the schema definition for the Setting entity.
type Setting struct {
	ent.Schema
}

// Fields of the Setting.
func (Setting) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Positive().Immutable().Unique(),
		field.String("name").NotEmpty().Unique(),
		field.Text("value").Optional(),
	}
}

// Edges of the Setting.
func (Setting) Edges() []ent.Edge {
	return nil
}
