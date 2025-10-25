// Načti data z Turso DB a zobraz je v tabulce
// KONFIGURACE - NAHRAĎ SVÝMI ÚDAJI!
const TURSO_URL = "https://mydb-fedo.aws-eu-west-1.turso.io";
const READ_TOKEN =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicm8iLCJpYXQiOjE3NjEzMzk0NjcsImlkIjoiZTZhOTMzMWQtOTk2NC00N2QxLWFmMjctNzIzNzEyNGU5NzI4IiwicmlkIjoiOTcwMGEwYzgtOWU1OC00MTE1LThkNTAtYmJmNTVjMWQ1YTBmIn0.2xmylxMOlM1k8Htr_IcfKwxRCA2hwh151b2-4N0bP59pyv7YnjEPxYFeJLapQMEEzxeg7tSQiYxGZe6ciBsDCg";
async function fetchUsers() {
  const contentDiv = document.getElementById("content");

  try {
    const response = await fetch(`${TURSO_URL}/v2/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            type: "execute",
            stmt: {
              sql: "SELECT * FROM users ORDER BY age",
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const result = data.results[0].response.result;

    if (result.rows.length === 0) {
      contentDiv.innerHTML =
        '<p style="text-align: center; color: #999;">Žádná data v databázi.</p>';
      return;
    }

    // Vytvoř tabulku
    let html = `
                    <table>
                        <thead>
                            <tr>
                                <th>Jméno</th>
                                <th>Email</th>
                                <th>Věk</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

    result.rows.forEach((row) => {
      html += `
                        <tr>
                            <td>${row[0].value}</td>
                            <td>${row[1].value}</td>
                            <td>${row[2].value}</td>
                        </tr>
                    `;
    });

    html += `
                        </tbody>
                    </table>
                `;

    contentDiv.innerHTML = html;
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
    contentDiv.innerHTML = `
                    <div class="error">
                        <strong>Chyba při načítání dat:</strong><br>
                        ${error.message}<br><br>
                        Zkontroluj, že máš správně nastavené TURSO_URL a READ_TOKEN.
                    </div>
                `;
  }
}

// Načti data při načtení stránky
fetchUsers();
