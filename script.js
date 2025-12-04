document.getElementById('save-contact-btn').addEventListener('click', function () {
    // Contact details
    const contact = {
        name: "Ronak Patel",
        company: "Veer Dye Chem",
        title: "Sales Marketing Manager",
        phone: "+919724745409",
        email: "veerdyechem@gmail.com",
        website: "https://www.veerdyechem.com",
        address: "C-7, Phase-2, Opp. V-Trans, GIDC Naroda, Ahmedabad - 382330, Gujarat, India"
    };

    // Create vCard content
    const vCardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${contact.name}`,
        `ORG:${contact.company}`,
        `TITLE:${contact.title}`,
        `TEL;TYPE=WORK,VOICE:${contact.phone}`,
        `EMAIL:${contact.email}`,
        `URL:${contact.website}`,
        `ADR;TYPE=WORK:;;${contact.address}`,
        'END:VCARD'
    ].join('\n');

    // Create a blob and download link
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});
