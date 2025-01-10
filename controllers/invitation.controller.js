const generateInvitation = async (req, res) => {
	try {
		const { theme, details, additionalInfo } = req.body;

		const prompt = `Generate a wedding invitation design with theme: ${theme}, details: ${details}, additional info: ${additionalInfo}`;

		const response = await fetch('https://api.openai.com/v1/images/generations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				prompt,
				n: 1,
				size: '1024x1024',
			}),
		});

		const data = await response.json();

		if (response.ok && data.data && data.data[0]?.url) {
			res.json({ imageUrl: data.data[0].url });
		} else {
			res.status(400).json({
				message: data.error?.message || 'Failed to generate image',
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { generateInvitation };
