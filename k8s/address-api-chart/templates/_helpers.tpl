{{/*
Return the fully qualified app name
*/}}
{{- define "address-api.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}
