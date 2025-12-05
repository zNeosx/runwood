export const clientMessageTemplate = ({
  name,
  message,
}: {
  name: string;
  message: string;
}) => `

<!DOCTYPE html>

<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de réception</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f8f9fa;
      color: #212529;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }
    h1 {
      color: #1d4ed8;
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #1d4ed8;
      color: #ffffff;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
    .footer {
      font-size: 12px;
      color: #6c757d;
      margin-top: 30px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Merci pour votre message, ${name} !</h1>
    <p>Nous avons bien reçu votre message et nous reviendrons vers vous sous 24h pour en discuter.</p>
    <p>Voici un résumé de votre demande :</p>
    <blockquote style="background:#f1f3f5; padding:15px; border-radius:8px;">${message}</blockquote>
    <p>Pour préparer votre devis, vous pouvez déjà consulter notre galerie ou nos services :</p>
    <a href="https://votre-site.com/galerie" class="button">Voir nos créations</a>
    <div class="footer">
      <p>© 2025 Votre Entreprise. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>
`;
