const template = {}

const url = 'http://schavez-dev.com/#/'

const footer = ` <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
  <tr>
    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
      <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Flutter CIISA, admin@email.com</span>
      <br>
    </td>
  </tr>
</table>
</div>`

template.newPassword = (user, pass) => `
                        <h3>Se ha solicitado un cambio de contraseña: </h3>
                        <br />
                        <h3>Tu nueva contraseña es: ${pass}</h3>
                        <br />
                        <h3>Para realizar cambio de contraseña debes ingresar al siguiente link:</h3> 
                        <br />
                        <a href="${url}nombre-app/recovery/${user._id}">Camiar contraseña</a>
                        ${footer}
                        `

module.exports = template
