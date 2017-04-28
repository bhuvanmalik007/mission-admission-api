const x = `fastidious
adjective: overly concerned with details; fussy
Whitney is fastidious about her shoes, arranging them on a shelf in a specific order, each pair evenly spaced.

antipathy
noun: an intense feeling of dislike or aversion
Maria had an antipathy for tour groups, often bolting to the other side of the museum as soon as she saw a chaperone leading a group of wide-eyed tourists.

capricious
adjective: determined by chance or impulse or whim rather than by necessity or reason
Nearly every month our capricious CEO had a new plan to turn the company around, and none of them worked because we never gave them the time they needed to succeed.

imprudent
adjective: not wise, rash
Hitler, like Napoleon, made the imprudent move of invading Russia in winter, suffering even more casualties than Napoleon had.

pedantic
adjective: marked by a narrow focus on or display of learning especially its trivial aspects
Professor Thompson was regarded as an expert in his field, but his lectures were utterly pedantic, focused on rigorous details of the most trivial conventions in the field.

incorrigible
adjective: impervious to correction by punishment
Tom Sawyer seems like an incorrigible youth until Huck Finn enters the novel; even Sawyer can't match his fierce individual spirit.

intransigent
adjective: unwilling to change one's beliefs or course of action
Despite many calls for mercy, the judge remained intransigent, citing strict legal precedence.

ingratiate
verb: gain favor with somebody by deliberate efforts
Even though Tom didn't like his new boss, he decided to ingratiate himself to her in order to advance his career.

acerbic
adjective: harsh in tone
Most movie critics are acerbic towards summer blockbusters, often referring to them as garbage.

ostentatious
adjective: intended to attract notice and impress others; tawdry or vulgar
Matt wanted to buy stone lions for front of the house, but Cynthia convinced him that such a display would be too ostentatious for a modest house in an unassuming neighborhood.

exonerate
verb: pronounce not guilty of criminal charges
The document clearly indicated that Nick was out of the state at the time of the crime, and so served to exonerate him of any charges.

apocryphal
adjective: being of questionable authenticity
The web is notorious for sandwiching apocryphal stories between actual news.

soporific
adjective: inducing mental lethargy; sleep inducing
Although the professor is brilliant, his bland monotone gives his lectures a soporific effect.

indifference
noun: the trait of seeming not to care
In an effort to fight indifference, the president of the college introduced a new, stricter grading system.

vilify
verb: spread negative information about
Todd was noble after the divorce, choosing to say only complimentary things about Barbara, but Barbara did not hesitate to vilify Todd.

precocious
adjective: characterized by or characteristic of exceptionally early development or maturity (especially in mental aptitude)
Though only seven years old, she was a precocious chess prodigy, able to beat players twice her age.

apathy
noun: an absence of emotion or enthusiasm
Widespread apathy among voters led to a very small turnout on election day.

disaffected
adjective: discontented as toward authority
After watching his superior take rations from the soldiers, he quickly became disaffected and rebelled.

belligerent
adjective: characteristic of one eager to fight
Tom said that he was arguing the matter purely for philosophical reasons, but his belligerent tone indicated an underlying anger about the issue.

ascetic
adjective: practicing self-denial
His ascetic life is the main reason he inspired so many followers, especially since he gave up wealth and power to live in poverty.

preclude
verb: keep from happening or arising; make impossible
The manager specified that all other gates be locked, to preclude the possibility of persons without tickets entering the arena undetected.

impudent
adjective: improperly forward or bold
In an impudent move, the defendant spoke out of order to say terribly insulting things to the judge.`;

let splitArray = x.split(/\n\n/g);
let final = [];
// let y = splitArray.reduce((acc, set)=>{
//   let wordArray = set.split(/\n/g);
//   // console.log({word: wordArray[0], meaning: wordArray[1], sentence:wordArray[2]});
//   final.push({header: wordArray[0], meta: wordArray[1], description:wordArray[2]});
//
// },[]);
splitArray.forEach((set)=>{
  let wordArray = set.split(/\n/g);
  // console.log({word: wordArray[0], meaning: wordArray[1], sentence:wordArray[2]});
  final.push({word: wordArray[0], meaning: wordArray[1], example:wordArray[2]});

});

module.exports = final;
