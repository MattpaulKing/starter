import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const pincheApp: CustomThemeConfig = {
  name: 'pinche-app',
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `system-ui`,
    "--theme-font-family-heading": `Poppins`,
    "--theme-font-color-base": "0 0 0",
    "--theme-font-color-dark": "255 255 255",
    "--theme-rounded-base": "8px",
    "--theme-rounded-container": "12px",
    "--theme-border-base": "1px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "0 0 0",
    "--on-secondary": "255 255 255",
    "--on-tertiary": "0 0 0",
    "--on-success": "0 0 0",
    "--on-warning": "0 0 0",
    "--on-error": "0 0 0",
    "--on-surface": "255 255 255",
    // =~= Theme Colors  =~=
    // primary | #0ea5e9 
    "--color-primary-50": "219 242 252", // #dbf2fc
    "--color-primary-100": "207 237 251", // #cfedfb
    "--color-primary-200": "195 233 250", // #c3e9fa
    "--color-primary-300": "159 219 246", // #9fdbf6
    "--color-primary-400": "86 192 240", // #56c0f0
    "--color-primary-500": "14 165 233", // #0ea5e9
    "--color-primary-600": "13 149 210", // #0d95d2
    "--color-primary-700": "11 124 175", // #0b7caf
    "--color-primary-800": "8 99 140", // #08638c
    "--color-primary-900": "7 81 114", // #075172
    // secondary | #4F46E5 
    "--color-secondary-50": "229 227 251", // #e5e3fb
    "--color-secondary-100": "220 218 250", // #dcdafa
    "--color-secondary-200": "211 209 249", // #d3d1f9
    "--color-secondary-300": "185 181 245", // #b9b5f5
    "--color-secondary-400": "132 126 237", // #847eed
    "--color-secondary-500": "79 70 229", // #4F46E5
    "--color-secondary-600": "71 63 206", // #473fce
    "--color-secondary-700": "59 53 172", // #3b35ac
    "--color-secondary-800": "47 42 137", // #2f2a89
    "--color-secondary-900": "39 34 112", // #272270
    // tertiary | #8b5cf6 
    "--color-tertiary-50": "238 231 254", // #eee7fe
    "--color-tertiary-100": "232 222 253", // #e8defd
    "--color-tertiary-200": "226 214 253", // #e2d6fd
    "--color-tertiary-300": "209 190 251", // #d1befb
    "--color-tertiary-400": "174 141 249", // #ae8df9
    "--color-tertiary-500": "139 92 246", // #8b5cf6
    "--color-tertiary-600": "125 83 221", // #7d53dd
    "--color-tertiary-700": "104 69 185", // #6845b9
    "--color-tertiary-800": "83 55 148", // #533794
    "--color-tertiary-900": "68 45 121", // #442d79
    // success | #0FBA81 
    "--color-success-50": "219 245 236", // #dbf5ec
    "--color-success-100": "207 241 230", // #cff1e6
    "--color-success-200": "195 238 224", // #c3eee0
    "--color-success-300": "159 227 205", // #9fe3cd
    "--color-success-400": "87 207 167", // #57cfa7
    "--color-success-500": "15 186 129", // #0FBA81
    "--color-success-600": "14 167 116", // #0ea774
    "--color-success-700": "11 140 97", // #0b8c61
    "--color-success-800": "9 112 77", // #09704d
    "--color-success-900": "7 91 63", // #075b3f
    // warning | #fde047 
    "--color-warning-50": "255 250 227", // #fffae3
    "--color-warning-100": "255 249 218", // #fff9da
    "--color-warning-200": "255 247 209", // #fff7d1
    "--color-warning-300": "254 243 181", // #fef3b5
    "--color-warning-400": "254 233 126", // #fee97e
    "--color-warning-500": "253 224 71", // #fde047
    "--color-warning-600": "228 202 64", // #e4ca40
    "--color-warning-700": "190 168 53", // #bea835
    "--color-warning-800": "152 134 43", // #98862b
    "--color-warning-900": "124 110 35", // #7c6e23
    // error | #ff0000 
    "--color-error-50": "255 217 217", // #ffd9d9
    "--color-error-100": "255 204 204", // #ffcccc
    "--color-error-200": "255 191 191", // #ffbfbf
    "--color-error-300": "255 153 153", // #ff9999
    "--color-error-400": "255 77 77", // #ff4d4d
    "--color-error-500": "255 0 0", // #ff0000
    "--color-error-600": "230 0 0", // #e60000
    "--color-error-700": "191 0 0", // #bf0000
    "--color-error-800": "153 0 0", // #990000
    "--color-error-900": "125 0 0", // #7d0000
    // surface | #475990 
    "--color-surface-50": "235 234 233", // #ebeae9
    "--color-surface-100": "228 227 226", // #e4e3e2
    "--color-surface-200": "221 220 218", // #dddcda
    "--color-surface-300": "201 198 196", // #c9c6c4
    "--color-surface-400": "161 156 152", // #a19c98
    "--color-surface-500": "120 113 108", // #78716C
    "--color-surface-600": "108 102 97", // #6c6661
    "--color-surface-700": "90 85 81", // #5a5551
    "--color-surface-800": "72 68 65", // #484441
    "--color-surface-900": "59 55 53", // #3b3735  
  }
}

export const pincheNeutral: CustomThemeConfig = {
  name: 'pinche-neutral',
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `system-ui`,
    "--theme-font-family-heading": `Poppins`,
    "--theme-font-color-base": "0 0 0",
    "--theme-font-color-dark": "255 255 255",
    "--theme-rounded-base": "8px",
    "--theme-rounded-container": "12px",
    "--theme-border-base": "1px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "0 0 0",
    "--on-secondary": "0 0 0",
    "--on-tertiary": "0 0 0",
    "--on-success": "0 0 0",
    "--on-warning": "0 0 0",
    "--on-error": "0 0 0",
    "--on-surface": "0 0 0",
    // =~= Theme Colors  =~=
    // primary | #d49f91 
    "--color-primary-50": "249 241 239", // #f9f1ef
    "--color-primary-100": "246 236 233", // #f6ece9
    "--color-primary-200": "244 231 228", // #f4e7e4
    "--color-primary-300": "238 217 211", // #eed9d3
    "--color-primary-400": "225 188 178", // #e1bcb2
    "--color-primary-500": "212 159 145", // #d49f91
    "--color-primary-600": "191 143 131", // #bf8f83
    "--color-primary-700": "159 119 109", // #9f776d
    "--color-primary-800": "127 95 87", // #7f5f57
    "--color-primary-900": "104 78 71", // #684e47
    // secondary | #769898 
    "--color-secondary-50": "234 240 240", // #eaf0f0
    "--color-secondary-100": "228 234 234", // #e4eaea
    "--color-secondary-200": "221 229 229", // #dde5e5
    "--color-secondary-300": "200 214 214", // #c8d6d6
    "--color-secondary-400": "159 183 183", // #9fb7b7
    "--color-secondary-500": "118 152 152", // #769898
    "--color-secondary-600": "106 137 137", // #6a8989
    "--color-secondary-700": "89 114 114", // #597272
    "--color-secondary-800": "71 91 91", // #475b5b
    "--color-secondary-900": "58 74 74", // #3a4a4a
    // tertiary | #f9e8ce 
    "--color-tertiary-50": "254 252 248", // #fefcf8
    "--color-tertiary-100": "254 250 245", // #fefaf5
    "--color-tertiary-200": "254 249 243", // #fef9f3
    "--color-tertiary-300": "253 246 235", // #fdf6eb
    "--color-tertiary-400": "251 239 221", // #fbefdd
    "--color-tertiary-500": "249 232 206", // #f9e8ce
    "--color-tertiary-600": "224 209 185", // #e0d1b9
    "--color-tertiary-700": "187 174 155", // #bbae9b
    "--color-tertiary-800": "149 139 124", // #958b7c
    "--color-tertiary-900": "122 114 101", // #7a7265
    // success | #77be6f 
    "--color-success-50": "235 245 233", // #ebf5e9
    "--color-success-100": "228 242 226", // #e4f2e2
    "--color-success-200": "221 239 219", // #ddefdb
    "--color-success-300": "201 229 197", // #c9e5c5
    "--color-success-400": "160 210 154", // #a0d29a
    "--color-success-500": "119 190 111", // #77be6f
    "--color-success-600": "107 171 100", // #6bab64
    "--color-success-700": "89 143 83", // #598f53
    "--color-success-800": "71 114 67", // #477243
    "--color-success-900": "58 93 54", // #3a5d36
    // warning | #c5d0a4 
    "--color-warning-50": "246 248 241", // #f6f8f1
    "--color-warning-100": "243 246 237", // #f3f6ed
    "--color-warning-200": "241 243 232", // #f1f3e8
    "--color-warning-300": "232 236 219", // #e8ecdb
    "--color-warning-400": "214 222 191", // #d6debf
    "--color-warning-500": "197 208 164", // #c5d0a4
    "--color-warning-600": "177 187 148", // #b1bb94
    "--color-warning-700": "148 156 123", // #949c7b
    "--color-warning-800": "118 125 98", // #767d62
    "--color-warning-900": "97 102 80", // #616650
    // error | #e87878 
    "--color-error-50": "252 235 235", // #fcebeb
    "--color-error-100": "250 228 228", // #fae4e4
    "--color-error-200": "249 221 221", // #f9dddd
    "--color-error-300": "246 201 201", // #f6c9c9
    "--color-error-400": "239 161 161", // #efa1a1
    "--color-error-500": "232 120 120", // #e87878
    "--color-error-600": "209 108 108", // #d16c6c
    "--color-error-700": "174 90 90", // #ae5a5a
    "--color-error-800": "139 72 72", // #8b4848
    "--color-error-900": "114 59 59", // #723b3b
    // surface | #d9dbe7 
    "--color-surface-50": "230 232 244", // #e6e8f4
    "--color-surface-100": "222 225 240", // #dee1f0
    "--color-surface-200": "214 217 236", // #d6d9ec
    "--color-surface-300": "189 195 225", // #bdc3e1
    "--color-surface-400": "140 149 202", // #8c95ca
    "--color-surface-500": "91 104 179", // #5b68b3
    "--color-surface-600": "82 94 161", // #525ea1
    "--color-surface-700": "68 78 134", // #444e86
    "--color-surface-800": "55 62 107", // #373e6b
    "--color-surface-900": "45 51 88", // #2d3358

  }
}
