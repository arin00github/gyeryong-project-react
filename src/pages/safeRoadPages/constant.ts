import { MAP_CONFIG } from "../../baseMap/baseMap.constant";
import { MapCreationConfig } from "../../baseMap/baseMap.interface";

export const SMART_SAFE_ROAD_MAP_CONFIG: MapCreationConfig = {
    ...MAP_CONFIG,
    /** 레이어 id */
    layerId: "layer_relaxroad",
    /** 지도 위 자산 선택 시 보여질 icon */
    selectedIcon:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjE2cHgiCiAgIGhlaWdodD0iMTZweCIKICAgdmlld0JveD0iMCAwIDE2IDE2IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxMyIKICAgc29kaXBvZGk6ZG9jbmFtZT0ic2FmZV9yb2FkX3NlbGVjdGVkLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTciIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxNSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM5OTk5OTkiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjE4LjM4NDc3NiIKICAgICBpbmtzY2FwZTpjeD0iMy40NTM5NDQ2IgogICAgIGlua3NjYXBlOmN5PSIzLjc4MDMwMTYiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzEzIgogICAgIHNob3dndWlkZXM9ImZhbHNlIiAvPgogIDxnCiAgICAgaWQ9InN1cmZhY2UxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmYwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDEyLjAwMTcwOSwwLjQ5NzYzMiBDIDUuNjU1NDM5LDAuNDkxNzc3IDAuNTAzNDg2LDUuNjMyMDIxIDAuNDk3NjMyLDExLjk3ODI5MSBjIC0wLjAwNTg1NSw2LjM0NjI3IDUuMTM0Mzg5LDExLjQ5ODIyMyAxMS40ODA2NTksMTEuNTA0MDc3IDYuMzQ2MjcsMC4wMDU5IDExLjQ5ODIyMywtNS4xMzQzODkgMTEuNTA0MDc3LC0xMS40ODA2NTkgMC4wMDU5LC0zLjA1MDE5IC0xLjIwNjAyNSwtNS45Nzc0MzcgLTMuMzYwNDc4LC04LjEzMTg5IEMgMTcuOTczMjkxLDEuNzA5NTEyIDE1LjA0NjA0NSwwLjQ5NzYzMiAxMi4wMDE3MDksMC40OTc2MzIgWiBtIDAsMCIKICAgICAgIHRyYW5zZm9ybT0ic2NhbGUoMC42NjcyMjMpIgogICAgICAgaWQ9InBhdGgyIiAvPgogIDwvZz4KICA8cGF0aAogICAgIGQ9Ik0gMTIuODI4MDQ5LDEyLjg1MDUwOCAxMC40ODYwOTUsNy40ODk0MjMyIEMgMTAuNDAyODMxLDcuMjk4NzY4NCAxMC4yMjEzOTMsNy4xNzY2Mzk3IDEwLjAyMTY5Miw3LjE3NjYzOTcgSCA4LjM4NjczMjIgbCAwLjA0MTA0NCwwLjM4ODAwNDIgYyAwLjAwODQyLDAuMDc5MDg1IC0wLjA1Mzc3OCwwLjE0ODEwNzIgLTAuMTMzMzU3MywwLjE0ODEwNzIgSCA3LjgwNTg5MjEgYyAtMC4wNzk1NzgsMCAtMC4xNDE3MzE1LC0wLjA2OTAyIC0wLjEzMzM1NzQsLTAuMTQ4MTA3MiBMIDcuNzEzNTc5OCw3LjE3NjYzOTcgSCA2LjA3ODYyNTYgYyAtMC4xOTk4NjczLDAgLTAuMzgxMzA3MiwwLjEyMjEyNTMgLTAuNDY0NTcxNywwLjMxMjc4MzUgTCAzLjI3MjEwMDcsMTIuODUwNTA4IGMgLTAuMTU0OTYwOSwwLjM1NTAwMiAwLjA5MjMxNywwLjc1OTQzIDAuNDY0NzM3NCwwLjc1OTQzIGggMy4yOTc3MzQ1IGwgMC4xNzI3MjY3LC0xLjYzNjQ3MSBjIDAuMDE0MzcsLTAuMTM2Mzc5IDAuMTI5MzQ0MSwtMC4yMzk5MDcgMC4yNjY1NDYxLC0wLjIzOTkwNyBoIDEuMTUyNjMyNyBjIDAuMTM3MjA1OSwwIDAuMjUyMTM3LDAuMTAzNTMxIDAuMjY2NTQ0NiwwLjIzOTkwNyBsIDAuMTcyNzI3LDEuNjM2NDcxIGggMy4yOTc3MzQzIGMgMC4zNzI0MjgsMCAwLjYxOTcwOCwtMC40MDQ0MjggMC40NjQ1NywtMC43NTk0MyB6IE0gNy41ODc3NjIzLDguMzY4ODA4MSBhIDAuMTM0MDI2OTYsMC4xMzQwMjY5NiAwIDAgMSAwLjEzMzM1NzQsLTAuMTE5OTYxIGggMC42NTgyNDEgYyAwLjA2ODUxMiwwIDAuMTI2MTU2LDAuMDUxNzcgMC4xMzMzNTc0LDAuMTE5OTYxIGwgMC4wNzcwNjgsMC43MzAxMTIgYyAwLjAxMjU1MywwLjExODc4OSAtMC4wODA1ODUsMC4yMjIxNDkgLTAuMTk5ODY5MiwwLjIyMjE0OSBIIDcuNzEwNzM1OCBjIC0wLjExOTQ1MDIsMCAtMC4yMTI0MzIyLC0wLjEwMzM2MyAtMC4xOTk4Njc4LC0wLjIyMjE0OSB6IE0gOC41MTMyMjAyLDExLjE5NzQ0OSBIIDcuNTg2OTI0OSBjIC0wLjE1OTE1NjksMCAtMC4yODMyOTk3LC0wLjEzNzg4MyAtMC4yNjY1NDYsLTAuMjk2MjAxIGwgMC4wODQ5NDYsLTAuODA0MTY2IGMgMC4wMTQzNywtMC4xMzYzNjI5IDAuMTI5MzQ0MiwtMC4yMzk5MDQ5IDAuMjY2NTQ4LC0wLjIzOTkwNDkgaCAwLjc1NjQxMjUgYyAwLjEzNzIwNTgsMCAwLjI1MjE0MDIsMC4xMDM1MzEgMC4yNjY1NDYyLDAuMjM5OTA0OSBsIDAuMDg0OTQ2LDAuODA0MTY2IGMgMC4wMTY3NDgsMC4xNTgzMTUgLTAuMTA3MzkyNCwwLjI5NjIwMSAtMC4yNjY1NDQ2LDAuMjk2MjAxIHoiCiAgICAgaWQ9InBhdGgyLTUiCiAgICAgc3R5bGU9Im92ZXJmbG93OmhpZGRlbjtmaWxsOiNmZjAwMDA7c3Ryb2tlLXdpZHRoOjAuMDA4Mzc2NztmaWxsLW9wYWNpdHk6MSIgLz4KICA8cGF0aAogICAgIGQ9Ik0gMTAuODgxNzk5LDIuMTczNTQ1NiBDIDEwLjYyNDg4NywyLjE1NDc5OTUgMTAuMzY2NzMxLDIuMTAzOTA0MiAxMC4xNDUyNzEsMi4wMjkwMzU0IDEwLjA3MzUyOSwyLjAwNjMxNDcgMTAuMDAxNzkzLDEuOTgxMDgzOCA5LjkyOTY0NjMsMS45NTM3NTY0IDkuNzc3NDE4MywxLjkwNjQxMTggOS41NzAzNDExLDEuODEyNTY3OSA5LjMzNTM0NjcsMS42Nzg5MDY3IGMgLTAuMDAyNTQsLTAuMDAxMTYgLTAuMDA0OTcsLTAuMDAyNzEgLTAuMDA3NTEsLTAuMDA0MTYgQyA5LjI3MjU2MjcsMS42NDMyNTU4IDkuMjE2MDU3OSwxLjYwOTY3MTQgOS4xNTg1MTc1LDEuNTc0MDIxNCA5LjA4MDk0MDMsMS41MjcwOTk3IDkuMDA0MTg4NCwxLjQ3NzA1MyA4LjkyNzQ2MjksMS40MjQ5MjY0IGMgLTAuMDAyOTEsLTAuMDAyMTEgLTAuMDA1OTEsLTAuMDAzOTcgLTAuMDA4NzIsLTAuMDA2MDYgQyA4Ljg2MzY5MzcsMS4zODEzMzMxIDguODA4ODM5MSwxLjM0MjU1OTUgOC43NTQ0MjE1LDEuMzAyMzEwMyA4LjcxODk3MjMsMS4yNzY2NTQ1IDguNjgzNTEzOCwxLjI0OTM0MyA4LjY0ODA2NzUsMS4yMjIyMzUxIDguNjIxMzc5OCwxLjIwMTU4OTQgOC41OTQ2ODI2LDEuMTgyMTk3OCA4LjU2Nzk5NTEsMS4xNjA5MzEyIDguMzcyODE3NCwxLjAwNzAzMjggOC4xODAxNDQzLDAuODM0MzYzNjIgNy45OTk3NTE0LDAuNjQ4MzU2MjEgNy44MTkzODY1LDAuODM0MzYzNjIgNy42MjY2OTMsMS4wMDcwMzI4IDcuNDMxNTE1MiwxLjE2MDkzMTIgYyAtMC4wMjY2ODgsMC4wMjEyNjcgLTAuMDUzMzk1LDAuMDQwNjU4IC0wLjA4MDA3MywwLjA2MTMwNCAtMC4wMzU0NDksMC4wMjcxMDYgLTAuMDcwOTA4LDAuMDU0NDE5IC0wLjEwNjM1NDMsMC4wODAwNzUgLTAuMDU0NDI2LDAuMDQwMjU2IC0wLjEwOTI3MjEsMC4wNzkwMjkgLTAuMTY0MzA5OSwwLjExNjU1NjMgLTAuMDAyOTEsMC4wMDIxMSAtMC4wMDU5MSwwLjAwMzk3IC0wLjAwODcyLDAuMDA2MDYgLTAuMDc2NzQyLDAuMDUyMTI2IC0wLjE1MzQ2OTgsMC4xMDIxNzMzIC0wLjIzMTAzODUsMC4xNDkwOTQ5IC0wLjA1NzU2OSwwLjAzNTY1IC0wLjExNDA2MTksMC4wNjkyMzMgLTAuMTY5MzI1NywwLjEwMDcxOTkgLTAuMDAyNTQsMC4wMDE1MyAtMC4wMDQ5NywwLjAwMjkyIC0wLjAwNzUxLDAuMDA0MTYgQyA2LjQyOTE2MjYsMS44MTI1Njc5IDYuMjIyMDg1NywxLjkwNjQxMjQgNi4wNjk4NjYzLDEuOTUzNzU2NCA1Ljk5NzcxMDcsMS45ODEwODM3IDUuOTI1OTc1LDIuMDA2MzA4NSA1Ljg1NDIzOCwyLjAyOTAzNTIgNS42MzI3ODA3LDIuMTAzOTA0MSA1LjM3NDYyNTgsMi4xNTQ3OTAxIDUuMTE3NzEzNiwyLjE3MzU0NTMgYyAwLDAgLTMuODI3ZS00LDAgLTUuNzM5ZS00LDAgMC4wMDc1MSwwLjEyMTU2OTcgMC4wMTUyMTUsMC4yODI3Nzc0IDAuMDI0MTgzLDAuNDU3MzE1NiAwLjAwMTYsMCAwLjAwMzA5LDAgMC4wMDQ4NywtMS45MThlLTQgMC4wNDMzODUsMC42NTE0NDg2IDAuMTY3MDQwNiwxLjI1Nzg1ODggMC4zNTM2NTk1LDEuODAyMzMxMiAwLjAwODM1LDAuMDIzNzcxIDAuMDE1NDMxLDAuMDQ4NTk0IDAuMDIzNzgsMC4wNzIxNTYgMC4wMDM5NCwwLjAxMTA1OCAwLjAwODUzLDAuMDIxMjU5IDAuMDEyNTYsMC4wMzIzMTkgMC40NDY2NTA4LDEuMjE3MTg5MiAxLjIyMjM5NTMsMi4xMDI4MzA5IDIuMTU0NzM4MSwyLjQyNzUwMSB2IDAuMDAzMzQgYyAwLjEyMzI0ODQsMC4wNDI5NiAwLjIyNzA4ODUsMC4wNjk0NTEgMC4zMDkwMzE1LDAuMDg2MTI4IDAuMDgxOTc2LC0wLjAxNjY3NiAwLjE4NTgxMTIsLTAuMDQzMTY5IDAuMzA5MDM5LC0wLjA4NjEyOCB2IC0wLjAwMzM0IGMgMC45MzIzNDcsLTAuMzI0NjcwNCAxLjcwODA5MTIsLTEuMjEwMzEyMSAyLjE1NDc1NzIsLTIuNDI3NTA3MSAwLjAwMzksLTAuMDExMDU4IDAuMDA4NSwtMC4wMjEyNiAwLjAxMjU2LC0wLjAzMjMyIDAuMDA4MywtMC4wMjM1NjIgMC4wMTU0MywtMC4wNDgzODMgMC4wMjM3NywtMC4wNzIxNTIgMC4xODY2MywtMC41NDQ0NzIgMC4zMTAzMDIsLTEuMTUwODg0MyAwLjM1MzY2MiwtMS44MDIzMzI4IDAuMDAxNiwxLjkxN2UtNCAwLjAwMzMsMS45MTdlLTQgMC4wMDQ5LDEuOTE3ZS00IDAuMDA5LC0wLjE3NDUzOCAwLjAxNjY2LC0wLjMzNTc0NSAwLjAyNDIxLC0wLjQ1NzMxNTMgLTEuOTRlLTQsNy41ZS02IC01Ljc2ZS00LDcuNWUtNiAtNS43NmUtNCw3LjVlLTYgeiBNIDguMDExOTk4Nyw2LjYwMTQ4ODIgYyAtMC4wMDQyMiwtMC4wMDEzNiAtMC4wMDgwNiwtMC4wMDMxMyAtMC4wMTIyOTgsLTAuMDA0NCAtMC4wMDQyMiwwLjAwMTM2IC0wLjAwODA2LDAuMDAzMTcgLTAuMDEyMjk4LDAuMDA0NCBDIDYuNzAxNjE2NCw2LjIwMDY5NDIgNS43MzQ0NDkzLDQuNjA0NjAwNCA1LjY0Njg3MDQsMi41NTEzOTk5IDYuNDE5MjY5OCwyLjM3Mzk1MDMgNy4yMjgzNjMyLDEuOTQxNjYwMSA3Ljk3NTcyOTYsMS4yOTEyNDY2IGMgMC4wMDc5OCwwLjAwNzA5IDAuMDE2MDYsMC4wMTMxNDkgMC4wMjM5ODcsMC4wMjAwMTggMC4wMDc5OCwtMC4wMDY4OCAwLjAxNjA2LC0wLjAxMjkxNiAwLjAyMzk4NiwtMC4wMjAwMTggMC43NDczNjY3LDAuNjUwNDIxMSAxLjU1NjQ4MTYsMS4wODI3MDM3IDIuMzI4ODYxNCwxLjI2MDE1MzMgLTAuMDg3NTgsMi4wNTMyMDA1IC0xLjA1NDcyNzMsMy42NDkyOTQzIC0yLjM0MDU0MTksNC4wNTAwODgzIHogTSA2Ljk2MDE4NTIsMy41MDU2MzA5IGMgLTAuMDc0NjYsLTAuMDczMzkzIC0wLjE5NTE5OTQsLTAuMDczMzkzIC0wLjI2OTY0MzUsMCBsIC0wLjA4OTg3NSwwLjA4ODYzMSBjIC0wLjA3NDI1NywwLjA3MzQxIC0wLjA3NDI1NywwLjE5MjY5NTQgMCwwLjI2NjA4MjMgbCAwLjk4MjU1MTIsMC45Njk2MzYxIGMgMC4wMDE2OSwwLjAwMTkxIDAuMDAzNTYsMC4wMDM4MSAwLjAwNTUzLDAuMDA1NjcgbCAwLjA5MDA5LDAuMDg4NjEgYyAwLjA3NDI1NywwLjA3MzQxNiAwLjE5NDk4ODEsMC4wNzM0MTYgMC4yNjk0MjQ4LDAgbCAxLjcwNjYxMTUsLTEuNjg0NTAzIGMgMC4wNzQ2NjksLTAuMDczNjA2IDAuMDc0NjY5LC0wLjE5MjY3MjQgMCwtMC4yNjYwODA0IGwgLTAuMDg5NjYsLTAuMDg4NjMxIGMgLTAuMDc0NDM1LC0wLjA3MzM5NSAtMC4xOTUxNzg1LC0wLjA3MzM5NSAtMC4yNjk0MjU3LDAgbCAtMS40ODIzODYsMS40NjI4NTA1IHoiCiAgICAgaWQ9InBhdGgyLTUzIgogICAgIHN0eWxlPSJvdmVyZmxvdzpoaWRkZW47ZmlsbDojZmYwMDAwO3N0cm9rZS13aWR0aDowLjAwNzEzNDQzO2ZpbGwtb3BhY2l0eToxIiAvPgo8L3N2Zz4K",
};
